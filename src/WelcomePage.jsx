import "./App.css";
import { useMemo } from "react";
import React from "react";
import { Stack } from "@mui/system";
import { Button, Link, styled, Typography } from "@mui/material";

import GitHubIcon from "@mui/icons-material/GitHub";
import ArticleIcon from "@mui/icons-material/Article";
import CollectionsIcon from "@mui/icons-material/Collections";
import SmartDisplayIcon from "@mui/icons-material/SmartDisplay";

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const Wrapper = styled(Stack)(({ theme }) => ({
    flexDirection: "column",
    justifyContent: "flex-start",
    textAlign: "flex-start",
    alignItems: "center",
    minHeight: "80vh",
    maxHeight: "100vh",
    gap: theme.spacing(6),

    padding: theme.spacing(10, 20),
}));

// const Container = styled(Stack)(({ theme }) => ({
//     flexDirection: "column",
//     justifyContent: "flex-start",
//     textAlign: "flex-start",
//     alignItems: "center",

//     gap: theme.spacing(3),
// }));

const SubContainer = styled(Stack)(({ theme }) => ({
    flexDirection: "column",
    justifyContent: "flex-start",
    textAlign: "flex-start",
    alignItems: "center",

    gap: theme.spacing(1),
}));

const Footer = styled('div')(({ theme }) => ({
    textAlign: 'center',
    padding: theme.spacing(2), // Adjust padding as needed
    marginTop: 'auto', // This pushes the footer to the bottom
}));

const WelcomePage = () => {
    // TODO: @Anran
    // Add Authors
    const authorList = useMemo(
        () => [
            { name: "Anran Xu [1]", link: "https://anranxu.com" },
            { name: "Zhongyi Zhou [1]", link: "https://zhongyizhou.net" },
            { name: "Kakeru Miyazaki [1]", link: "https://kakeru-miyazaki.github.io/kakekakemiya/index.html" },
            { name: 'Ryo Yoshikawa [1]', link: "https://r44111.net/"},
            { name: 'Simo Hosio [2]', link: "https://simohosio.com/"},
            { name: 'Koji Yatani [1]', link: 'https://iis-lab.org/member/koji-yatani/'}
        ],
        []
    );

    // TODO: @Anran
    // Change URL
    const linkList = useMemo(
        () => [
            {
                title: "Paper",
                link: "https://dl.acm.org/doi/10.1145/3631439",
                icon: <ArticleIcon />,
            },
            {
                title: "Dataset",
                link: "https://dipa-download.s3.ap-northeast-1.amazonaws.com/DIPA2dataset.zip",
                icon: <CollectionsIcon />,
            },
            {
                title: "Visualization",
                link: "/DIPA2_VIS/visualization",
                icon: <SmartDisplayIcon />,
            },
        ],
        []
    );

    return (
            <Wrapper>
            <Container>
                <Row>
                    <Col>
                        <Typography variant="h3" fontWeight="bold" textAlign="center" sx={{alignItems: "center"}}>
                            DIPA2: An Image Dataset with Cross-cultural Privacy Perception Annotations
                        </Typography>
                    </Col>
                    
                </Row>
                <br></br>
                <br></br>
                <Row>
                    <SubContainer>
                    <Stack direction="row" justifyContent='center' gap={3} sx={{ flexWrap: 'wrap' }}>
                    {authorList.map((author) =>
                        author["link"] ? (
                            <Col xs ={4} sm={2}>
                            
                                <Link
                                    key={author.name}
                                    href={author.link}
                                    underline="hover"
                                    color="black"
                                >
                                    <Typography
                                        variant="h4"
                                        fontWeight="medium"
                                    >
                                        {author.name}
                                    </Typography>
                                </Link>
                            </Col>
                        ) : (
                            <Typography
                                key={author.name}
                                variant="h4"
                                fontWeight="medium"
                            >
                                {author.name}
                            </Typography>
                        )
                    )}
                        </Stack>
                    </SubContainer>
                    <br></br>
                    <SubContainer>
                        <Typography variant="h4">
                            The University of Tokyo [1], University of Oulu [2]
                        </Typography>
                        <Typography variant="h4">Proc. ACM Interact. Mob. Wearable Ubiquitous Technol. 7, 4, Article 192 (December 2023)</Typography>
                    </SubContainer>
                </Row>
                <br></br>
                <br></br>

                <SubContainer>
                    <Stack direction="row" gap={3} justifyContent='center' sx={{ flexWrap: 'wrap' }}>
                        {linkList.map((item) => (
                            <Button
                                key={item.title}
                                variant="contained"
                                startIcon={item.icon}
                                color="primary"
                                onClick={() => {
                                    window.open(item.link, "_blank").focus();
                                }}
                            >
                                <Typography variant="h6">{item.title}</Typography>
                            </Button>
                        ))}
                    </Stack>
                </SubContainer>
                <Container></Container>
            
            </Container>
            <Footer>
                <Typography variant="body2">
                    "DIPA2: An Image Dataset with Cross-cultural Privacy Perception Annotations" © 2024 by Anran Xu, Zhongyi Zhou, Kakeru Miyazaki, Ryo Yoshikawa, Simo Hosio, Koji Yatani is licensed under CC BY 4.0. To view a copy of this license, visit <a href="http://creativecommons.org/licenses/by/4.0/" underline="hover" target="_blank">http://creativecommons.org/licenses/by/4.0/</a>.
                </Typography>
            </Footer>
        </Wrapper>
    );
};

export default WelcomePage;
