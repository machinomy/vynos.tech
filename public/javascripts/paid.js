document.write('<script src="' + window.VYNOS_URL + '"></script>')

let loadContent = (token) => {
	$.ajax({
		type: 'GET',
		url: window.location.pathname + '/content',
		headers: {
			authorization: `paywall ${token}`
		}
	}).done((data, status, response) => {
		window.paywallMeta = response.getResponseHeader('paywall-meta')
		window.paywallGateway = response.getResponseHeader('paywall-gateway')
		window.paywallPrice = response.getResponseHeader('paywall-price')
		window.paywallAddress = response.getResponseHeader('paywall-address')

		if(!window.paywallPrice) {
			$('#buy').hide()
			$('.b-article__for').hide()
		}
		$("#content").html(data);
	})
}

let displayButton = document.getElementById('display')
if (displayButton) {
	displayButton.onclick = () => {
		vynos.display()
	}
}

let buyButton = document.getElementById('buy')
if (buyButton) {
  buyButton.onclick = () => {
		$(buyButton).addClass('disabled').attr('disabled', true).html("Loading...")
    vynos.ready().then(wallet => {
	    wallet.getAccount().then(account => {
		    if (!account) return vynos.display();
		    let title = 'Outline'
		    let receiver = window.paywallAddress
		    let amount = window.paywallPrice
		    let gateway = window.paywallGateway
		    let meta = window.paywallMeta

		    return wallet.buy(receiver, amount, gateway, meta)
	    }).then(result => {
				let contentKey = $('meta[property="og:url"]').attr('content')
				localStorage[contentKey] = result.token
		    loadContent(result.token)
		    console.log('Result: ', result)
		    buyButton.style.display = 'none'
	    }).catch(err => {
		    console.log('Err: ', err)
	    })
    })
  }
}

window.addEventListener('load', () => {
	let contentKey = $('meta[property="og:url"]').attr('content')
  loadContent(localStorage[contentKey])
})
