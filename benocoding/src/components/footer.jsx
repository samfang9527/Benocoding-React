
import styled from "styled-components";

const FooterContainer = styled.footer`
    position: block;
    bottom: 0;
    height: 10%;
    width: 100%;
    font-size: 40px;
    font-family: 'pacifico';
    text-align: center;
    letter-spacing: 5px;
    padding: 2% 0;
    background-color: DarkSlateGray;
    color: white;
`;

const Footer = () => {
    return (
        <FooterContainer>-------Being not just coding-------</FooterContainer>
    )
}

export default Footer;