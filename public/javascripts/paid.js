document.write('<script src="' + window.VYNOS_URL + '"></script>')

let loadContent = (token) => {
	$.ajax({
		type: 'GET',
		url: "/paid/content",
		headers: {
			authorization: `paywall ${token}`
		}
	}).done((data, status, response) => {
		window.paywallMeta = response.getResponseHeader('paywall-meta')
		window.paywallGateway = response.getResponseHeader('paywall-gateway')
		window.paywallPrice = response.getResponseHeader('paywall-price')
		window.paywallAddress = response.getResponseHeader('paywall-address')
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
    console.log('beforeBuy')
    vynos.ready().then(wallet => {
      let title = 'Outline'
      let receiver = window.paywallAddress
      let amount = window.paywallPrice
			let gateway = window.paywallGateway
			let meta = window.paywallMeta

      return wallet.buy(receiver, amount, gateway, meta)
    }).then(result => {
      loadContent(result.token)
      channelsBalance()
      console.log('Result: ', result)
      buyButton.style.display = 'none'
    }).catch(err => {
      console.log('Err: ', err)
    })
  }
}

window.addEventListener('load', () => {
  loadContent()
})
