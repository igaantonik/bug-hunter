import styled from 'styled-components';

const Header = styled.header`
    width: calc(80% - 20px);
    margin: 0 auto;
    text-align: center;
`;

const Title = styled.h1`
    font-family: 'Paytone One', sans-serif;
    font-size: 2.2rem;
    margin-bottom: 12px;
`;

const Description = styled.p`
    font-family: 'Gudea', sans-serif;
    font-size: 1.2rem;
    color: #333;
`;

function LandingPageHeader() {
    return (
        <Header>
            <Title>Sharpen Your Code Review Skills!</Title>  
            <Description>
                Practise your code review abilities by identifying hidden bugs
                in pre-selected code snippets. Get instant feedback and track
                your progress.
            </Description>
        </Header>
  );

}
export default LandingPageHeader;
