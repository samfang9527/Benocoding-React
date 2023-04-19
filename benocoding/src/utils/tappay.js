const TAPPAY_SCRIPT_ID = 'tappay-sdk';
const TAPPAY_SCRIPT_SRC = 'https://js.tappaysdk.com/tpdirect/v5.8.0';

function insertTappayScript() {
  return new Promise((resolve) => {
    if (document.getElementById(TAPPAY_SCRIPT_ID)) {
      resolve();
      return;
    }
    const tappayScriptTag = document.createElement('script');
    tappayScriptTag.setAttribute('id', TAPPAY_SCRIPT_ID);
    tappayScriptTag.setAttribute('src', TAPPAY_SCRIPT_SRC);
    tappayScriptTag.addEventListener('load', resolve);
    document.head.appendChild(tappayScriptTag);
  });
}

const tappay = {
  setupSDK: async () => {
    await insertTappayScript();
    window.TPDirect.setupSDK(
      127670,
      'app_xAgW5Av7OANqLXZC5Ej6IwdJBIJ9gU7hfPbWwxWtVWBKd9y9hBQeFZQWuazt',
      'sandbox'
    );
  },
  setupCard(numberElement, expirationDateElement, ccvElement) {
    window.TPDirect.card.setup({
      fields: {
        number: {
          element: numberElement,
          placeholder: '   ',
        },
        expirationDate: {
          element: expirationDateElement,
          placeholder: 'MM / YY',
        },
        ccv: {
          element: ccvElement,
          placeholder: '後三碼',
        },
      },
      styles: {
        '.valid': {
          color: 'green',
        },
        '.invalid': {
          color: 'red',
        },
      },
    });
  },
  canGetPrime() {
    return window.TPDirect.card.getTappayFieldsStatus().canGetPrime;
  },
  getPrime() {
    return new Promise((resolve) => {
      window.TPDirect.card.getPrime((result) => {
        resolve(result);
        const prime = result.card.prime;
        localStorage.setItem('prime', JSON.stringify(prime));
      });
    });
  },
};

export default tappay;