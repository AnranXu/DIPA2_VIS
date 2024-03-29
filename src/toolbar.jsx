import { Component } from "react";
import React from "react";
import {
    Box,
    Button,
    Stack,
    ToggleButton,
    ToggleButtonGroup,
    Typography,
} from "@mui/material";
import TransitionButton from "./components/TransitionButton";
import DetailSection from "./components/DetailSection";
import Informativeness from "./components/Infomativeness";

class Toolbar extends Component {
    constructor(props) {
        super(props);
        this.imgAnnotationMap = {};
        this.prefix = "https://imwut-visualization.s3.ap-northeast-1.amazonaws.com/";
        this.state = {
            selectedAnnotator: -1,
            currentImage: "",
            defaultBboxs: [],
            manualBbox: [],
            validList: [],
            validAnns: {},
            annotatorList: { CrowdWorks: [], Prolific: [] },
            informationTypeText: [],
            informativenessValue: 0,
            sharingOwnerText: [],
            sharingOthersText: [],
            ifLoadAnnotator: false,
            age: [],
            gender: [],
            nationality: [],
            bigFive: [],
            frequency: [],
        };
        this.imgAnnotationMapLink = this.prefix + "img_annotation_map.json";
        fetch(this.imgAnnotationMapLink)
            .then((res) => res.text())
            .then((text) => {
                //text = text.replaceAll("'", '"');
                this.imgAnnotationMap = JSON.parse(text);
                this.keys = Object.keys(this.imgAnnotationMap);
                this.currentImageIndex = -1;
                this.listLen = this.keys.length;
                this.moveToNext();
            });
        this.informationType = [
            "It tells personal information",
            "It tells location of shooting",
            "It tells individual preferences/pastimes",
            "It tells social circle",
            "It tells others\' private/confidential information",
            "Other things it can tell",
        ];
        this.sharingOwner = [
            "I won't share it",
            "Close relationship",
            "Regular relationship",
            "Acquaintances",
            "Public",
            "Broadcast program",
            "Other recipients",
        ];
        this.sharingOthers = [
            "I won't allow them to share it",
            "Close relationship",
            "Regular relationship",
            "Acquaintances",
            "Public",
            "Broadcast program",
            "Other recipients",
        ];  
        this.intensity = [
            "",
            "extremely disagree",
            "moderately disagree",
            "slightly disagree",
            "neutral",
            "slightly agree",
            "moderately agree",
            "extremely agree",
        ];
        this.frequency = [
            "Never",
            "Less than once a month",
            "Once or more per month",
            "Once or more per week",
            "Once or more per day",
        ];
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevState.currentImage !== this.state.currentImage) {
            //fetch default label
            var prefix = this.prefix;
            console.log(this.state.currentImage);
            var image_URL =
                prefix + "all_img/" + this.state.currentImage + ".jpg";
            var label_URL =
                prefix + "annotations/" + this.state.currentImage + "_label.json";
            var ori_bboxs = [];
            var label_list = {};
            this.calculateAverageInformativeness();
            fetch(label_URL)
                .then((res) => res.text()) //read new label as text
                .then((text) => {
                    var cur_ann = JSON.parse(text); 
                    var keys = Object.keys(cur_ann['annotations']);
                    this.cur_source = cur_ann['source'];
                    for(var i = 0; i < keys.length; i++)
                    {
                        //this.cur_source = cur_ann['source'];
                        ori_bboxs.push({
                        bbox: cur_ann['annotations'][keys[i]]['bbox'], 
                        category: cur_ann['annotations'][keys[i]]['category'], 
                        width: cur_ann['width'], 
                        height: cur_ann['height']}); //get bbox (x, y, w, h), width, height of the image (for unknown reasons, the scale of bboxs and real image sometimes are not identical), and category
                        //create list of category, we just need to know that this image contain those categories.
                        label_list[cur_ann['annotations'][keys[i]]['category']] = 1;
                    }

                    this.setState({
                        defaultBboxs: ori_bboxs,
                        validList: [],
                        informationTypeText: [],
                        informativenessValue: 0,
                        sharingOwnerText: [],
                        sharingOthersText: [],
                    });
                })
                .then(() => {
                    this.props.toolCallback({ imageURL: image_URL });
                })
                .catch((error) => {
                    console.error("Error:", error);
                });
        }
    }
    getText(textArray, index) {
    // get multiple choice answer from text array, 
        var text = [];
        //console.log(textArray, index)
        for (var i = 0; i < textArray.length; i++) {
            if (index[i] === 1) {
                text.push(textArray[i]);
            }
        }
        //console.log(text);
        return text;
    }
    createDefaultValidList = () => {
        // generate a list of valid bbox info to canvas.js
        return this.state.validList.map((label, i) => (
            <Box
                sx={{
                    border: "2px solid rgba(0, 0, 0, 0.2)",
                    borderRadius: "5px",
                    boxShadow: "2px 2px 1px 0px rgba(0,0,0,0.2)",
                }}
                textAlign="left"
            >
                <Button
                    onClick={(e) => {
                        this.showPrivacyInfo(e);
                    }}
                    id={"defaultLabelButton-" + label}
                    key={"defaultLabelButton-" + label}
                    fullWidth
                    sx={{
                        justifyContent: "flex-start",
                        fontSize: "30px",
                        color: "grey",
                        padding: "10px 25px",
                    }}
                >
                    {label}
                </Button>

                <Stack
                    id={"isDetailDisplayed-" + label}
                    spacing="20px"
                    padding="0px 25px 20px 25px"
                    sx={{ display: "none" }}
                >
                    <hr style={{ marginTop: "-15px" }}></hr>
                    <DetailSection
                        title={"Information Type"}
                        text={this.state.informationTypeText}
                    />
                    <Informativeness
                        value={this.state.informativenessValue - 4}
                    />
                    <DetailSection
                        title={"Sharing Scope (as photo owner)"}
                        text={this.state.sharingOwnerText}
                    />
                    <DetailSection
                        title={"Sharing Scope (by others)"}
                        text={this.state.sharingOthersText}
                    />
                </Stack>
            </Box>
        ));
    };
    showPrivacyInfo = (e) => {
        var category = e.target.id.split("-")[1];
        //console.log(this.state.validAnns)
        for (var i = 0; i < this.state.validList.length; i++) {
            var label = this.state.validList[i];
            var defaultLabelButton = document.getElementById(
                "defaultLabelButton-" + label
            );
            var privacyDetail = document.getElementById(
                "isDetailDisplayed-" + label
            );

            if (e.target.id === "defaultLabelButton-" + label) {
                privacyDetail.style.display = "block";
                e.target.style.color = "black";
                var informationTypeValue = this.state.validAnns[category]["informationType"];
                var informativenessValue =
                    this.state.validAnns[category]["informativeness"];
                var sharingOwnerValue = this.state.validAnns[category]["sharingOwner"];
                var sharingOthersValue = this.state.validAnns[category]["sharingOthers"];
                //console.log(informationTypeValue, informativenessValue, sharingOwnerValue, sharingOthersValue);
                this.setState({
                    informationTypeText: this.getText(this.informationType, informationTypeValue),
                    informativenessValue: informativenessValue,
                    sharingOwnerText: this.getText(this.sharingOwner, sharingOwnerValue),
                    sharingOthersText: this.getText(this.sharingOthers, sharingOthersValue),
                });
            } else {
                defaultLabelButton.style.color = "grey";
                privacyDetail.style.display = "none";
            }
        }
        if (this.props.stageRef) {
            //find all bounding boxes
            var bboxs = this.props.stageRef.current.find(".bbox");
            for (var i = 0; i < bboxs.length; i++) {
                //highlight qualified bounding boxes (not finished)
                if (bboxs[i].attrs["id"].split("-")[1] === category) {
                    if (bboxs[i].attrs["stroke"] === "black")
                        bboxs[i].attrs["stroke"] = "red";
                    else bboxs[i].attrs["stroke"] = "black";
                } else {
                    bboxs[i].attrs["stroke"] = "black";
                }
            }
            this.props.stageRef.current.getLayers()[0].batchDraw();
        }
    };
    moveToNext = () => {
        this.setState({ selectedAnnotator: -1 });
        this.currentImageIndex = (this.currentImageIndex + 1) % this.listLen;
        this.setState({
            currentImage: this.keys[this.currentImageIndex],
            annotatorList:
                this.imgAnnotationMap[this.keys[this.currentImageIndex]],
            defaultBboxs: [],
            manualBbox: [],
            validList: [],
            validAnns: {},
            age: [],
            gender: [],
            nationality: [],
            bigFive: [],
            frequency: [],
            ifLoadAnnotator: false,
        });
        this.props.toolCallback({ defaultBboxs: [] });
    };
    moveToPrevious = () => {
        if (this.currentImageIndex <= 0) return;
        this.setState({ selectedAnnotator: -1 });
        this.currentImageIndex = (this.currentImageIndex - 1) % this.listLen;
        this.setState({
            currentImage: this.keys[this.currentImageIndex],
            annotatorList:
                this.imgAnnotationMap[this.keys[this.currentImageIndex]],
            defaultBboxs: [],
            manualBbox: [],
            validList: [],
            validAnns: {},
            age: [],
            gender: [],
            nationality: [],
            bigFive: [],
            frequency: [],
            ifLoadAnnotator: false,
        });
        this.props.toolCallback({ defaultBboxs: [] });
    };
    generateAnnotatorList = () => {
        var optionNum = 0;
        return Object.keys(this.state.annotatorList).map((platfrom, index) => {
            return this.state.annotatorList[platfrom].map((annotation, i) => {
                optionNum += 1;
                const index = optionNum;
                return (
                    <ToggleButton
                        fullWidth
                        value={platfrom + "-" + annotation}
                        onClick={(e) => {
                            document.getElementById("annotator").value =
                                platfrom + "-" + annotation;
                            this.loadPrivacyAnns();
                            this.setState({ selectedAnnotator: index });
                            this.showPrivacyInfo(e);
                        }}
                        sx={{
                            backgroundColor:
                                this.state.selectedAnnotator === index
                                    ? "grey"
                                    : "white",
                            opacity:
                                this.state.selectedAnnotator === index
                                    ? "1"
                                    : "0.5",
                            color:
                                this.state.selectedAnnotator === index
                                    ? "white"
                                    : "black",
                        }}
                    >
                        <Typography variant="h6">
                            Annotator {optionNum}
                        </Typography>
                    </ToggleButton>
                );
            });
        });
    };
    loadPrivacyAnns = (e) => {
        var prefix = this.prefix;
        //console.log(document.getElementById("annotator").value);
        var platform = document.getElementById("annotator").value.split("-")[0];
        var selectFile = document
            .getElementById("annotator")
            .value.split("-")[1];
        var image_id = selectFile.split('_')[0];
        var prefix_len = image_id.length + 1;
        // remove prefix_len length word in selectFile to get worker_id

        var worker_file = selectFile.slice(prefix_len);
        var worker_id = worker_file.slice(0, -11) + '.json';
        var annotationURL = prefix + platform + "/labels/" + selectFile;
        var workerURL = prefix + platform + "/workerinfo/" + worker_id;
        var validList = [];
        // fetch worker info
        fetch(workerURL).then((res) => res.text()) //read new label as text
        .then((text) => {
            var workerInfo = JSON.parse(text);
            var bigFive = [];
            bigFive.push('Agreeableness: ' + String(workerInfo['bigfives']['Agreeableness']));
            bigFive.push('Conscientiousness: ' + String(workerInfo['bigfives']['Conscientiousness']));
            bigFive.push('Extraversion: ' + String(workerInfo['bigfives']['Extraversion']));
            bigFive.push('Neuroticism: ' + String(workerInfo['bigfives']['Neuroticism']));
            bigFive.push('Openness: ' + String(workerInfo['bigfives']['Openness to Experience']));
            this.setState({
                age: [workerInfo["age"]],
                gender: [workerInfo["gender"]],
                nationality: [workerInfo["nationality"]],
                frequency: [this.frequency[workerInfo["frequency"]]],
                bigFive: bigFive,
            });
        });
        fetch(annotationURL)
            .then((res) => res.text()) //read new label as text
            .then((text) => {
                //var json = text.replaceAll("'", '"');
                var ann = JSON.parse(text); // parse each row as json file
                var defaultAnn = ann["defaultAnnotation"];
                var manualAnn = ann["manualAnnotation"];
                var validAnns = {};
                var keys = Object.keys(defaultAnn);
                var manualKeys = Object.keys(manualAnn);
                for (var i = 0; i < keys.length; i++) {
                    // prefix of keys should not include Object in the prefix
                    if (!defaultAnn[keys[i]]["ifNoPrivacy"]) {
                        validList.push(keys[i]);
                        validAnns[keys[i]] = defaultAnn[keys[i]];
                    }
                }
                var validBbox = [];
                for (var i = 0; i < this.state.defaultBboxs.length; i++) {
                    if (
                        validList.includes(
                            this.state.defaultBboxs[i]["category"]
                        )
                    )
                        validBbox.push(this.state.defaultBboxs[i]);
                }
                for (var i = 0; i < manualKeys.length; i++) {
                    var category = "Extra Label " + String(i);
                    validBbox.push({
                        bbox: manualAnn[manualKeys[i]]["bbox"],
                        category: category,
                    });
                    validList.push(category);
                    validAnns[category] = manualAnn[manualKeys[i]];
                }
                this.setState({
                    validList: validList,
                    validAnns: validAnns,
                    ifLoadAnnotator: true,
                });
                this.props.toolCallback({ defaultBboxs: validBbox });
            })
            .then(() => {})
            .catch((error) => {
                console.error("Error:", error);
            });
    };
    showWorkerInfo (){
        var workerInfo = document.getElementById("workerInfo");
        var workerInfoButton = document.getElementById("workerInfoButton");
        console.log(workerInfo, workerInfoButton);
        if (workerInfo.style.display === "none") {
            workerInfo.style.display = "block";
        }
        else {
            workerInfo.style.display = "none";
        }
    }
    workerInfo () {
        return(
        <Box
            sx={{
                border: "2px solid rgba(0, 0, 0, 0.2)",
                borderRadius: "5px",
                boxShadow: "2px 2px 1px 0px rgba(0,0,0,0.2)",
            }}
            textAlign="left"
        >
            <Button
                onClick={(e) => {
                    this.showWorkerInfo();
                }}
                id={"workerInfoButton"}
                key={"workerInfoButton"}
                fullWidth
                sx={{
                    justifyContent: "flex-start",
                    fontSize: "30px",
                    color: "grey",
                    padding: "10px 25px",
                }}
                style={{color: 'red'}}
            >
                {'Worker\'s Information'}
            </Button>

            <Stack
                id={"workerInfo"}
                spacing="20px"
                padding="0px 25px 20px 25px"
                sx={{ display: "none" }}
            >
                <hr style={{ marginTop: "-15px" }}></hr>
                <DetailSection
                    title={"Age"}
                    text={this.state.age}
                />
                <DetailSection
                    title={"Gender"}
                    text={this.state.gender}
                />
                <DetailSection
                    title={"Nationality"}
                    text={this.state.nationality}
                />
                <DetailSection
                    title={"Frequency of Shraing Own Photos"}
                    text={this.state.frequency}
                />
                <DetailSection
                    title={"Big-five Personality"}
                    text={this.state.bigFive}
                />
            </Stack>
        </Box>);
        
    }
    calculateAverageInformativeness(){
        var prefix  = this.prefix;
        var urls = [];
        for (var i = 0; i < this.state.annotatorList['CrowdWorks'].length; i++){
            // input annotation url 
            var annotationURL = prefix + "CrowdWorks/labels/" + this.state.annotatorList['CrowdWorks'][i];
            urls.push(annotationURL);
        }
        for (var i = 0; i < this.state.annotatorList['Prolific'].length; i++){
            // input annotation url
            var annotationURL = prefix + "Prolific/labels/" + this.state.annotatorList['Prolific'][i];
            urls.push(annotationURL);
        }
        //console.log(urls);
        Promise.all(urls.map(url =>
            fetch(url)
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }
                    return response.json();
                })
        ))
        .then(dataArray => {
            let result = {};
            for (var i = 0; i < dataArray.length; i++)
            {
                for (let [key, value] of Object.entries(dataArray[i]['defaultAnnotation'])) {
                    if(value['ifNoPrivacy'] === true)
                        continue;
                    if (key in result){
                        result[key].push(Number(value['informativeness']));
                    }
                    else{
                        result[key] = [Number(value['informativeness'])];
                    }
                }
            }
            // calculate average informativeness for each key
            for (let [key, value] of Object.entries(result)) {
                var sum = 0;
                for (var i = 0; i < value.length; i++){
                    sum += value[i];
                }
                result[key] = sum / value.length;
                // to 2 decimal places
                result[key] = Math.round(result[key] * 100) / 100;
            }
            console.log('average informativeness: ', result);
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }
    render() {
        return (
            <>
                <Stack width="calc(100% - 60px)" gap="15px" padding="0 30px">
                    <Stack
                        direction="row"
                        padding="0 50px"
                        width="auto"
                        justifyContent="space-between"
                        alignItems="center"
                    >
                        <TransitionButton
                            onClick={this.moveToPrevious}
                            transType={"prev"}
                        />
                        <TransitionButton
                            onClick={this.moveToNext}
                            transType={"next"}
                        />
                    </Stack>
                    <ToggleButtonGroup id="annotator">
                        <Stack
                            direction="row"
                            width="100%"
                            justifyContent="center"
                            gap="20px"
                        >
                            {this.generateAnnotatorList()}
                        </Stack>
                    </ToggleButtonGroup>
                </Stack>
                <Stack
                    position="absolute"
                    left="55vw"
                    top="0"
                    padding="30px 20px"
                    width="calc(45vw - 40px)"
                >
                    {this.state.ifLoadAnnotator ? this.workerInfo(): <div></div>}
                    <br></br>
                    {this.state.validList.length &&
                    this.state.ifLoadAnnotator ? (
                        <Stack width="100%" gap="20px">
                            {this.createDefaultValidList()}
                        </Stack>
                    ) : (
                        <div></div>
                    )}
                    {this.state.validList.length === 0 &&
                    this.state.ifLoadAnnotator ? (
                        <Typography variant="h6">
                            This Annotator did not annotate any
                            privacy-threatening content in this image.
                        </Typography>
                    ) : (
                        <div></div>
                    )}
                </Stack>
            </>
        );
    }
}
export default Toolbar;
