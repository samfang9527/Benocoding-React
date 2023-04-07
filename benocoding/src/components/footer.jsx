
import styled from "styled-components";

const FooterContainer = styled.div`
    position: fixed;
    bottom: 0;
    height: 10%;
    width: 100%;
    font-size: 40px;
    font-family: 'pacifico';
    text-align: center;
    letter-spacing: 5px;
`;

const Footer = () => {
    return <footer>
        <FooterContainer>-------Being not just coding-------</FooterContainer>
    </footer>
}

export default Footer;