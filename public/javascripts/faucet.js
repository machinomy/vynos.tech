import * as $ from "jquery"

// document.write('<script src="' + window.VYNOS_URL + '"></script>')

window.addEventListener("load", function () {
	var displayButton = document.getElementById('display')
	if (displayButton) {
		displayButton.onclick = function () {
			vynos.display()
		}
	}

	vynos.ready().then(function (instance) {
		var provider = instance.provider
		var web3 = new Web3(provider)
		web3.eth.getAccounts(function (err, accounts) {
			if (accounts && accounts[0]) {
				var vynosAddress = accounts[0]
				$('#vynos-address').html(vynosAddress)
				web3.eth.getBalance(vynosAddress, function (err, balance) {
					const vynosBalance = web3.fromWei(balance, 'ether').toString()
					$('#vynos-balance').html(vynosBalance)

					$('#request-ether').prop('disabled', false)
					$('#wait-for-vynos').hide()
					$('#request-ether').click(function () {
						$.ajax({
							type: 'POST',
							url: '/faucet/request',
							data: JSON.stringify({ address: vynosAddress }),
							contentType: 'application/json',
							success: function (data) {
								var txid = data.txid;
								var etherscanUrl = 'https://ropsten.etherscan.io/tx/' + txid;
								$('#faucet-transactions').append('<li><a href="' + etherscanUrl + '" target="_blank">' + txid + '</a></li>')
							}
						})
					})
				})
			}
		})
	})
});
