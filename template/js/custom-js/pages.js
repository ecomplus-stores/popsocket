// Add your custom JavaScript for storefront pages here.
if (window.storefront && window.storefront.context && window.storefront.context.resource === 'products') {
    storefront.on('widget:@ecomplus/widget-tag-manager', function () {
      setTimeout(function () {
        const bodyProductKeywords = window.storefront.context.body && window.storefront.context.body.keywords
        const hasPlant = bodyProductKeywords.some(keyword => keyword.toLowerCase() === 'plant')
        if (hasPlant) {
            document.querySelector('.gallery__stage .glide').classList.add('seal-plant')
        }
      }, 800);
    });
  }
document.getElementById('c-5fad9d7580c6216a3fc547dc').href = '/impactor-flex-antibacteria-all'
document.getElementById('c-5f1f3f5bf023684cdbd4a1f4').href = '/impactor-ultra-all'
document.getElementById('c-5f1f3f6cf023684cdbd4a218').href = '/impactor-ultra-fabric-all'
document.getElementById('c-5f1f3f5af023684cdbd4a1f2').href = '/impactor-flex-all'
document.getElementById('c-5f1f3f5df023684cdbd4a1f8').href = '/soft-all'
document.getElementById('c-5f4d54c67430f92180ea8c8b').href = '/soft-touch-all'
document.getElementById('c-5f1f3f54f023684cdbd4a1e4').href = '/seed-eco-case-all'
document.getElementById('c-5f1f3f57f023684cdbd4a1eb').href = '/hardbox-all'
document.getElementById('c-5f1f3f3bf023684cdbd4a1af').href = '/impactor-clear-all'
document.getElementById('c-5fb80f6669274c73fcd951f5').href = '/seed-eco-case-antibacteria'
