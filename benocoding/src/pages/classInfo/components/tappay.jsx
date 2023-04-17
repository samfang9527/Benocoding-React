
import styled from "styled-components";
import { useEffect } from "react";

const Wrapper = styled.div`

`;

const TPField = styled.div`
    height: 40px;
    width: 300px;
    border: 1px solid gray;
    margin: 5px 0;
    padding: 5px;
`;

const PaymentButton = styled.button`
    background: linear-gradient(to right, #00c9ff, #92fe9d);
    border-radius: 5px;
    border: none;
    color: white;
    cursor: pointer;
    font-size: 16px;
    padding: 10px 20px;
    
    &:hover {
        opacity: 0.9;
    }
`;

const Tappay = () => {

    useEffect(() => {
        const script = document.querySelector('script[src="https://js.tappaysdk.com/tpdirect/v5.6.0"]');
        if (!script) {
            const newScript = document.createElement('script');
            newScript.src = 'https://js.tappaysdk.com/tpdirect/v5.6.0';
            newScript.async = true;
            document.body.appendChild(newScript);

            newScript.onload = () => {
                window.TPDirect.setupSDK(12345, 'YOUR_TAPPAY_KEY', 'sandbox');
                window.TPDirect.card.setup({
                    fields: {
                        number: {
                            element: '#card-number',
                            placeholder: '**** **** **** ****'
                        },
                        expirationDate: {
                            element: '#card-expiration-date',
                            placeholder: 'MM / YY'
                        },
                        ccv: {
                            element: '#card-ccv',
                            placeholder: 'CCV'
                        }
                    }
                });
            };
    
            return () => {
                document.body.removeChild(script);
            };
        }
    }, []);

    return (
        <Wrapper>
            <TPField class="tpfield" id="card-number"></TPField>
            <TPField class="tpfield" id="card-expiration-date"></TPField>
            <TPField class="tpfield" id="card-ccv"></TPField>
        </Wrapper>
    )
}

export default Tappay;
