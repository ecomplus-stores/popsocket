import getSections from "@ecomplus/storefront-template/template/js/netlify-cms/base-config/sections"
import getSettings from "@ecomplus/storefront-template/template/js/netlify-cms/base-config/collections/settings"
import getLayout from "@ecomplus/storefront-template/template/js/netlify-cms/base-config/collections/layout"
import getPages from "@ecomplus/storefront-template/template/js/netlify-cms/base-config/collections/pages"
import getBlogPosts from "@ecomplus/storefront-template/template/js/netlify-cms/base-config/collections/blog-posts"
import getExtraPages from "@ecomplus/storefront-template/template/js/netlify-cms/base-config/collections/extra-pages"
import getWidgets from "@ecomplus/storefront-template/template/js/netlify-cms/base-config/collections/widgets"

export default options => {
  options.sections = getSections(options).concat([
    {
        label: "Faq por categoria",
        name: "faq",
        widget: "object",
        icon: "https://api.iconify.design/bi:grid.svg",
        fields: [
            {
                label: "Faqs",
                name: "faq-list",
                widget: "list",
                fields: [
                    {
                        label: "Slug da categoria/marca",
                        hint: "Será inserido com base no link da página destino ou se no produto tiver a categoria/marca",
                        name: "slug",
                        widget: "string",
                        required: false
                    },
                    {
                        label: "Texto do faq",
                        required: false,
                        name: "text",
                        widget: "markdown"
                    }
                ]
            }
        ]
    },
    {
      label: "Lista compre junto",
      name: "buy_together_list",
      widget: "object",
      fields: [
          {
              label: "Lista compre junto",
              name: "buy_list",
              widget: "list",
              fields: [
                  {
                      label: "Slug da categoria",
                      hint: "Será inserido com base no produto tiver a categoria",
                      name: "slug",
                      widget: "string",
                      required: false
                  },
                  {
                    label: 'Produtos',
                    name: 'products',
                    widget: 'list',
                    field: {
                      label: 'SKU do produto',
                      name: 'product_id',
                      widget: 'select',
                      options: options.state.routes
                        .filter(({ sku }) => typeof sku === 'string')
                        .map(({ _id, sku }) => ({
                          label: sku,
                          value: _id
                        }))
                    }
                  }
              ]
          }
      ]
  },
  {
    "label": "Grid de categorias",
    "name": "categories-carousel",
    "widget": "object",
    "fields": [
        {
            "label": "Banners",
            "name": "banners",
            "widget": "list",
            "fields": [
                {
                    "label": "Imagem",
                    "name": "img",
                    "widget": "image"
                },
                {
                    "label": "Link",
                    "required": false,
                    "name": "link",
                    "widget": "string"
                },
                {
                    "label": "Alt",
                    "required": false,
                    "name": "alt",
                    "widget": "string"
                }
            ]
        },
        {
            "label": "Carousel autoplay",
            "required": false,
            "name": "autoplay",
            "hint": "Exibição de cada página em milisegundos, 0 desativa o autoplay",
            "min": 0,
            "step": 1000,
            "widget": "number"
        },
        {
          "label": "Título da estante de banner",
          "required": false,
          "name": "title",
          "widget": "string"
      }
    ]
  }
  ])
  options.layout = getLayout(options)
  if (options.layout && options.layout.files && options.layout.files.length) {
    options.layout.files.map(file => {
      if (file && file.name === 'header') {
        const stripe = file.fields.find(field => field.name === 'marketing_stripe')
        if (stripe) {
          stripe.fields = [{
            "label": "Market header list",
            "name": "market_list",
            "widget": "list",
            "fields": [
              {
                "label": "Texto",
                "name": "texto",
                "widget": "string",
                "required": false
              },
              {
                "label": "Link",
                "required": false,
                "name": "link",
                "widget": "string"
              }
            ]
          },
          {
            "label": "Slider autoplay",
            "name": "autoplay",
            "hint": "Exibição de cada slide em milisegundos, defina 0 para desabilitar autoplay",
            "min": 0,
            "step": 1000,
            "default": 9000,
            "widget": "number"
          },
          {
            "label": "Cor de fundo",
            "name": "background",
            "required": false,
            "widget": "color",
            "hint": "A cor primária da loja é usada por padrão"
          },
          {
            "label": "Cor da fonte",
            "name": "color",
            "required": false,
            "widget": "color"
          }
          ] 
        }
      }
      return file
    })
  }


  return {
    backend: {
      name: "git-gateway",
      branch: "master",
      commit_messages: {
        create: "Create {{collection}} “{{slug}}”",
        update: "Update {{collection}} “{{slug}}”",
        delete: "Delete {{collection}} “{{slug}}”",
        uploadMedia: "Upload “{{path}}”",
        deleteMedia: "[skip ci] Delete “{{path}}”",
        openAuthoring: "{{message}}"
      }
    },
    logo_url: "https://ecom.nyc3.digitaloceanspaces.com/storefront/cms.png",
    locale: "pt",
    load_config_file: Boolean(window.CMS_LOAD_CONFIG_FILE),
    media_folder: `${options.baseDir}template/public/img/uploads`,
    public_folder: "/img/uploads",
    slug: {
      encoding: "ascii",
      clean_accents: true,
      sanitize_replacement: "-"
    },
    collections: [
      getSettings(options),
      getPages(options),
      options.layout,
      getBlogPosts(options),
      getExtraPages(options),
      getWidgets(options)
    ]
  }
}
