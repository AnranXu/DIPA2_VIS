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
                link: "https://doi.org/10.1145/3581754.3584176",
                icon: <ArticleIcon />,
            },
            {
                title: "Dataset",
                link: "https://dipa-download.s3.ap-northeast-1.amazonaws.com/dataset.zip",
                icon: <CollectionsIcon />,
            },
            {
                title: "Visualization",
                link: "/DIPA_visualization/visualization",
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
                            DIPA: An Image Dataset with Cross-cultural Privacy Concern
                            Annotations
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
                        <Typography variant="h4">IUI 2023 Open Science track</Typography>
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
        </Wrapper>
    );
};

export default WelcomePage;
