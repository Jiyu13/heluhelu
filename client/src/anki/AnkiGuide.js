import styled from "styled-components";
import { PageContainer, PageText, PageTitle } from "../styles/Container";
import anki_config from "../assets/images/ankiconnect-config.png"
import { useMediaQuery } from "react-responsive";
import { DeviceSize } from "../responsive";
import { useContext } from "react";
import { UserContext } from "../components/UserContext";

export default function AnkiGuide() {
    const isMobile = useMediaQuery({ maxWidth: DeviceSize.mobile })
    const {isDark } = useContext(UserContext)

    const ankiCode = {
        "apiKey": null,
        "apiLogPath": null,
        "ignoreOriginList": [],
        "webBindAddress": "127.0.0.1",
        "webBindPort": 8765,
        "webCorsOriginList": [
            "http://localhost",
            "https://heluhe.lu"
        ]
    }

    return (
        <PageContainer style={{maxWidth: "750px"}}>
            <PageTitle>How to Add Cards to Anki</PageTitle>
            <PageText>
                This guide will show you how to install AnkiConnect and add cards.
            </PageText>


            <TipItem>
                <TipText>
                    Tip: Make sure Anki is running whenver you want to use AnkiConnect.
                </TipText>

            </TipItem>
            
            <StepsTable>
                <StepItem>
                    <StepNumber>1. </StepNumber>
                    <div> 
                        Open Anki Desktop.
                    </div>
                </StepItem>
                <StepItem>
                    <StepNumber>2. </StepNumber>
                    <div>Go to 
                        <MarkupText>Tools</MarkupText> → 
                        <MarkupText>Add-ons</MarkupText> → 
                        <MarkupText>Get Add-ons</MarkupText>.
                    </div>
                </StepItem>
                <StepItem>
                    <StepNumber>3. </StepNumber>
                    <div>Enter the code: 
                    </div>
                        <span style={{padding: "0 0 0 8px", color: "#2196F3"}}>
                            2055492159
                        </span>
                        .
                </StepItem>
                <StepItem>
                    <StepNumber>4. </StepNumber>
                    <div>Click OK, then restart Anki.</div>
                </StepItem>
                <StepItem>
                    <StepNumber>5. </StepNumber>
                    <div>In Anki, go to 
                        <MarkupText>Tools</MarkupText> → 
                        <MarkupText>Add-ons</MarkupText>.
                    </div>
                </StepItem>
                <StepItem>
                    <StepNumber>6. </StepNumber>
                    <div>
                        Select
                        <MarkupText>AnkiConnect</MarkupText> → 
                        <MarkupText>Config</MarkupText>.
                    </div>
                </StepItem>
                <StepItem>
                    <StepNumber>7. </StepNumber>
                    <div>Copy the code below and replace the old config with the code in the <MarkupText>Config</MarkupText> popup 
                        (adding <MarkupText>https://heluhe.lu</MarkupText>, Heluhelu's domain, to the list of allowed domain).  
                        {/* <span style={{padding: "0 0 0 8px", color: "#2196F3"}}>
                            https://heluhe.lu
                        </span> */}
                    </div>
                    
                </StepItem>
                <div 
                    style={{
                        maxWidth: isMobile ? "99%" : "700px", 
                        // color: isDark? "white" : , 
                        border: "1px solid #ccc",
                        margin: "8px 0 12px",
                    }}
                >
                    <pre style={{ margin: 0, padding: "12px 24px"}}>
                        <code style={{}}>
                            <JSONPunct>{`{`}</JSONPunct><br/>
                            <JSONKey>&nbsp;&nbsp;"apiKey": <JSONNull>null</JSONNull><JSONPunct>,</JSONPunct></JSONKey><br/>
                            <JSONKey>&nbsp;&nbsp;"apiLogPath": <JSONNull>null</JSONNull><JSONPunct>,</JSONPunct></JSONKey><br/>
                            <JSONKey>&nbsp;&nbsp;"ignoreOriginList": <JSONPunct>{`[]`}</JSONPunct><JSONPunct>,</JSONPunct></JSONKey><br/>
                            <JSONKey>&nbsp;&nbsp;"webBindAddress": <JSonValue>"127.0.0.1"</JSonValue><JSONPunct>,</JSONPunct></JSONKey><br/>
                            <JSONKey>&nbsp;&nbsp;"webBindPort": <JSONNull>8765</JSONNull><JSONPunct>,</JSONPunct></JSONKey><br/>
                            <JSONKey>&nbsp;&nbsp;"webCorsOriginList": <JSONPunct>{`[`}</JSONPunct></JSONKey><br/>
                            <JSONKey>&nbsp;&nbsp;&nbsp;&nbsp;<JSonValue>"http://localhost"</JSonValue><JSONPunct>,</JSONPunct></JSONKey><br/>
                            <JSONKey>&nbsp;&nbsp;&nbsp;&nbsp;<JSonValue>"https://heluhe.lu"</JSonValue></JSONKey><br/>
                            <JSONKey>&nbsp;&nbsp;<JSONPunct>{`]`}</JSONPunct></JSONKey><br/>
                            <JSONPunct>{`}`}</JSONPunct>
                        </code>
                    </pre>
                </div>
                <div 
                    style={{
                        maxWidth: isMobile ? "100%" : "700px", 
                        paddingTop: "12px", 
                    }}>
                    <PageText style={{marginBottom: "0", textAlign: "left"}}>Here's how it should turn out.</PageText>
                    <img 
                        src={anki_config} 
                        alt='anki connect config'
                        style={{width: "100%"}}
                    />
                    <div></div>
                </div>
                <StepItem>
                    <StepNumber>8. </StepNumber>
                    <div>Click OK, then you can start adding cards to Anki from Heluhe.lu.</div>
                </StepItem>
                
            </StepsTable>

            
        </PageContainer>
    )
}
const JSONKey = styled.span`
    color: #90a955;
`
const JSONNull = styled.span`
    color:  #00509d;
`
const JSONPunct = styled.span`
    color: rgb(153, 153, 153)
`
const JSonValue = styled.span`
    color: #ff3c38;
`
const MarkupText = styled.span`
    text-decoration: underline;
    color: #2196F3;
    padding: 0 8px;
`

const StepNumber = styled.div`
    margin-right: 8px;
`

const StepsTable = styled.div`
    padding-bottom: 150px;
    max-width: 750px;
    font-size: 20px;
    line-height: 1.6;
`
const StepItem = styled.div`
    display: flex;
    padding: 6px;
`

const TipItem = styled.div`
    display: flex;
    padding: 12px 12px 0 0;
    margin-left: 12px;
`
const TipText = styled.p`
    font-size: 20px;
    padding: 8px 4px;
    padding-left: 1rem;
    border-left: 3px solid #2196F3 !important;
`