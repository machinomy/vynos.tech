document.write('<script src="' + window.VYNOS_URL + '"></script>')

const Web3 = require('web3');
const MIN_BALANCE = 0.01;

let web3 = new Web3(new Web3.providers.HttpProvider(window.ETHEREUM_API));
let createAccount, getEtherBlock, listTransactions, testBuy;

function vynosDisplay() {
	vynos.ready().then(() => {
		vynos.display();
	});
	return false;
}

function getEther() {
	vynos.ready().then(wallet => {
		wallet.getAccount().then(account => {
			$.ajax({
				type: 'POST',
				url: '/faucet/request',
				data: JSON.stringify({address: account}),
				contentType: 'application/json',
				success: function (data) {
					let txid = data.txid;
					let etherscanUrl = 'https://ropsten.etherscan.io/tx/' + txid;
					listTransactions.append('<p class="small blue margins"><a href="'+ etherscanUrl +'" target="_blank">' + txid + '</a></p>');
				}
			})
		});
	});
	return false;
}

function showOrHideBlocks(account, balance) {
	if (!account) {
		if (createAccount.hasClass('b-line_disabled')) createAccount.removeClass('b-line_disabled');
		if (!getEtherBlock.hasClass('b-line_disabled')) getEtherBlock.addClass('b-line_disabled');
		if (!testBuy.hasClass('b-line_disabled')) testBuy.addClass('b-line_disabled');
	} else if (account) {
		if (!createAccount.hasClass('b-line_disabled')) createAccount.addClass('b-line_disabled');
		if (balance >= MIN_BALANCE) {
			if (!getEtherBlock.hasClass('b-line_disabled')) getEtherBlock.addClass('b-line_disabled');
			if (testBuy.hasClass('b-line_disabled')) testBuy.removeClass('b-line_disabled');
		} else {
			if (getEtherBlock.hasClass('b-line_disabled')) getEtherBlock.removeClass('b-line_disabled');
			if (!testBuy.hasClass('b-line_disabled')) testBuy.addClass('b-line_disabled');
		}
	}
}

function updateStats() {
	vynos.ready().then(wallet => {
		wallet.getAccount().then(account => {
			if (!account) return showOrHideBlocks(null);
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
	setInterval(updateStats, 20000)
})