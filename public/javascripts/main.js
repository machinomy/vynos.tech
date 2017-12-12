document.write('<script src="' + window.VYNOS_URL + '"></script>')

const Web3 = require('web3');
const MIN_BALANCE = 0.07;

let createAccount, getEtherBlock, listTransactions, testBuy;

function vynosDisplay() {
	vynos.ready().then(() => {
		vynos.display();
	});
	return false;
}

function getEther() {
	vynos.ready().then(wallet => {
		var provider = wallet.provider
		var web3 = new Web3(provider)
		web3.eth.getAccounts(function (err, accounts) {
			if (accounts && accounts[0]) {
				let account = accounts[0]
				$.ajax({
					type: 'POST',
					url: '/faucet/request',
					data: JSON.stringify({ address: account }),
					contentType: 'application/json',
					success: function (data) {
						let txid = data.txid;
						let etherscanUrl = 'https://ropsten.etherscan.io/tx/' + txid;
						listTransactions.append('<p class="small blue margins"><a href="' + etherscanUrl + '" target="_blank">' + txid + '</a></p>');
					}
				})
			}
		});
	});
	return false;
}

function disableBlock(block) {
	block.addClass('b-line_disabled');
	block.removeClass('b-line_light-gradient')
}

function enableBlock(block) {
	block.removeClass('b-line_disabled');
	block.addClass('b-line_light-gradient')
}

function showOrHideBlocks(account, balance) {
	if (!account) {
		if (createAccount.hasClass('b-line_disabled')) enableBlock(createAccount);
		if (!getEtherBlock.hasClass('b-line_disabled')) disableBlock(getEtherBlock);
		if (!testBuy.hasClass('b-line_disabled')) disableBlock(testBuy);
	} else if (account) {
		if (!createAccount.hasClass('b-line_disabled')) disableBlock(createAccount);
		if (balance >= MIN_BALANCE) {
			if (!getEtherBlock.hasClass('b-line_disabled')) disableBlock(getEtherBlock);
			if (testBuy.hasClass('b-line_disabled')) enableBlock(testBuy);
		} else {
			if (getEtherBlock.hasClass('b-line_disabled')) enableBlock(getEtherBlock);
			if (!testBuy.hasClass('b-line_disabled')) disableBlock(testBuy);
		}
	}
}

function updateStats() {
	vynos.ready().then(wallet => {
		let web3 = new Web3(wallet.provider)
		web3.eth.getAccounts(function (err, accounts) {
			if (!accounts || !accounts.length) return showOrHideBlocks(null);
			let account = accounts[0]
			web3.eth.getBalance(account, (err, balance) => {
				return showOrHideBlocks(account, web3.fromWei(balance, 'ether').toNumber());
			});
		})
	})
}

window.vynosDisplay = vynosDisplay;
window.getEther = getEther;

window.addEventListener('load', () => {
	createAccount = $('#createAccount');
	getEtherBlock = $('#getEtherBlock');
	listTransactions = $('#listTransactions');
	testBuy = $('#testBuy');
	setInterval(updateStats, 200)
	vynos.ready().then(() => {
		vynos.setContainerStyle({ right: 'auto', left: document.getElementById('svg_logo').offsetLeft + 'px' });
		if ($(window).scrollTop() < 605) {
			vynos.display()
		}
	});
})

window.addEventListener('resize', () => {
	vynos.setContainerStyle({ right: 'auto', left: document.getElementById('svg_logo').offsetLeft + 'px' });
})