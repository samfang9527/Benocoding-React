
import styled from "styled-components";

const FooterContainer = styled.footer`
    position: block;
    bottom: 0;
    height: 3%;
    width: 100%;
    font-size: 30px;
    font-family: 'pacifico';
    text-align: center;
    letter-spacing: 5px;
    padding: 10px 0;
    background-color: #38686A;
    color: white;
`;

const Footer = () => {
    return (
        <FooterContainer>-------Being not just coding-------</FooterContainer>
    )
}

export default Footer;