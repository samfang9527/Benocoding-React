
import styled from "styled-components";
import { useEffect, useRef } from "react";

const Wrapper = styled.div`
    width: 90%;
    height: 320px;
    position: relative;
    left: 50%;
    margin-left: -45%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
`;

const Title = styled.p`
    font-size: 18px;
    text-align: left;
    margin: 10px 0 0 0;
`;

const TPFieldContainer = styled.div`

`;

const TPField = styled.div`
    height: 50px;
    width: 400px;
    border: 2px solid gray;
    margin: 10px 0;
    padding: 10px;
    font-size: 30px;
`;

const SubmitBtn = styled.button`
    width: 100px;
    height: 40px;
    border: none;
    border-radius: 20px;
    background-color: orange;
    cursor: pointer;
    color: white;
    font-size: 20px;

    :hover {
        background-color: darkorange;
    }
`;

const Tappay = () => {

    const submitButton = useRef(null);

    function checkout(e) {
        e.preventDefault();
        window.TPDirect.card.getPrime(function(result) {
            if (result.status !== 0) {
                console.error('getPrime error');
                return;
            }
            window.localStorage.setItem('prime', result.card.prime);
        })

        // start buying class

    }

    useEffect(() => {
        // Display ccv field
        let fields = {
            number: {
                // css selector
                element: '#card-number',
                placeholder: '**** **** **** ****'
            },
            expirationDate: {
                // DOM object
                element: document.getElementById('card-expiration-date'),
                placeholder: 'MM / YY'
            },
            ccv: {
                element: '#card-ccv',
                placeholder: 'ccv'
            }
        }

        window.TPDirect.card.setup({
            fields: fields,
            styles: {
                // Style all elements
                'input': {
                    'color': 'gray'
                },
                // Styling ccv field
                'input.ccv': {
                    'font-size': '16px'
                },
                // Styling expiration-date field
                'input.expiration-date': {
                    'font-size': '16px'
                },
                // Styling card-number field
                'input.card-number': {
                    'font-size': '16px'
                },
                // style focus state
                ':focus': {
                    'color': 'black'
                },
                // style valid state
                '.valid': {
                    'color': 'green'
                },
                // style invalid state
                '.invalid': {
                    'color': 'red'
                },
                // Media queries
                // Note that these apply to the iframe, not the root window.
                '@media screen and (max-width: 400px)': {
                    'input': {
                        'color': 'orange'
                    }
                }
            }
        })

        window.TPDirect.card.onUpdate(function (update) {
            // update.canGetPrime === true
            // --> you can call TPDirect.card.getPrime()
            if (update.canGetPrime) {
                console.log(update.canGetPrime);
                // Enable submit Button to get prime.
                submitButton.current.removeAttribute('disabled');
            } else {
                // Disable submit Button to get prime.
                submitButton.current.setAttribute('disabled', true);
            }
        })
    }, [])

    

    return (
        <Wrapper>
            <TPFieldContainer>
                <Title>信用卡付款</Title>
                <TPField className="tpfield" id="card-number"></TPField>
                <TPField className="tpfield" id="card-expiration-date"></TPField>
                <TPField className="tpfield" id="card-ccv"></TPField>
            </TPFieldContainer>
            <SubmitBtn ref={submitButton} onClick={checkout}>Pay</SubmitBtn>
        </Wrapper>
    )

}

export default Tappay;
