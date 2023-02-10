import { Question } from "../redux/slices/quizSlice";

const airportCodes = {
    MIA: "MIAMI",
    PHL: "PHILADELPHIA",
    DOH: "DOHA",
    AUH: "ABU DHABI",
    DXB: "DUBAI",
    BOM: "MUMBAI",
    BLR: "BANGARE",
    HAN: "HANOI",
    BKK: "BANGKOK",
    SIN: "SINGAPORE",
    KIX: "OSAKA KANSAI",
    NRT: "TOKYO",
    INB: "JOHANNESBURG",
    СРТ: "CAPE TOWN",
    NBO: "NAIROBI",
    AKL: "AUCKLAND",
    CHC: "CHRISTCHURCH",
    BNE: "BRISBANE",
    MEL: "MELBOURNE",
    PER: "PERTH",
    SYD: "SYDNEY",
    CNS: "CAIRNS",
    AUA: "ARUBA",
    BON: "BONAIRE",
    CUR: "CURACAO",
    SXM: "ST MAARTEN",
    HAV: "HAVANNA",
    CAN: "GUANGZHOU",
    PEK: "BEIJING",
    CTU: "CHENGDU",
    HGH: "HANGZHOU",
    HKG: "HONG KONG",
    FUK: "FUKUOKA",
    NGO: "NAGOYA",
    HEL: "HELSINKI",
    BGO: "BERGEN",
    OSL: "OSLO",
    TRE: "SANDEFJORD",
    SVG: "STAVANGER",
    TRD: "TRONDHEIM",
    KEF: "REYKJAVIK",
    ABZ: "ABERDEEN",
    BHX: "BIRMINGHAM",
    DUS: "DUSSELDORF",
    FRA: "FRANKFURT",
    HAM: "HAMBURG",
    MUC: "MUNICH",
    СРН: "COPENHAGEN",
    LIS: "LISBON",
    PRG: "PRAGUE",
    GRQ: "GRONINGEN",
    EIN: "EINDHOVEN",
    MST: "MAASTRICHT",
    RTM: "ROTTERDAM",
    BLL: "BILLUND",
    ARN: "STOCKHOLM",
    AGP: "MALAGA",
    BOD: "BORDEAUX",
    MXP: "MILAN MALPENSA",
    FCO: "ROME",
    NRN: "WEEZE",
    BFS: "BELFAST",
    GOT: "GOTHENBURG",
    ORD: "CHICAGO O' HARE",
    JFK: "NEW YORK",
    SEA: "SEATTLE",
    SFo: "SAN FRANCISCO",
    LAX: "LOS ANGELES",
    YYZ: "TORONTO",
    YVR: "VANCOUVER",
    MEM: "MEMPHIS",
    BRS: "BRISTOL",
    CWL: "CARDIFF",
    EDI: "EDINBURGH",
    GLA: "GLASGOW",
    LCY: "LONDON CITY",
    LGW: "LONDON GATWICK",
    LHR: "LONDON HEATHROW",
    LTN: "LONDON LUTON",
    STN: "LONDON STANSTED",
    NCL: "NEWCASTLE",
    NWI: "NORWICH",
    SOU: "SOUTHAMPTON",
    DUB: "DUBLIN",
    BJV: "BODRUM",
    DLM: "DALAMAN",
    SAW: "ISTANBUL SABIHA AIRPORT",
    IST: "ISTANBUL ATATURK AIRPORT",
    RUH: "RIYADH",
    JED: "JEDDAH",
    KRK: "KRAKOW",
    WAW: "WARSAW",
    AGA: "AGADIR",
    AHU: "AL HOCEIMA",
    CMN: "CASABLANCA",
    RAK: "MARRAKECH",
    OUD: "OUJDA",
    NDR: "NADOR",
    RBA: "RABAT",
};

export function pickRandomAirportCode() {
    const airportCodesKeys = Object.keys(airportCodes);
    const randomIndex = Math.floor(Math.random() * airportCodesKeys.length);
    return airportCodesKeys[randomIndex];
}

export function pickUniqueQuestions(): Question[] {
    const codes: string[] = [];

    for (let i = 0; i < Object.keys(airportCodes).length; i++) {
        let airportCode = pickRandomAirportCode();
        while (codes.includes(airportCode)) {
            airportCode = pickRandomAirportCode();
        }
        codes.push(airportCode);
    }

    return codes.map(
        (code) =>
            ({
                question: code,
                //@ts-ignore
                answer: airportCodes[code],
            } as Question)
    );
}

export default airportCodes;
