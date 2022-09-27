import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  StyleSheet,
  Image,
  TouchableHighlight,
  Pressable,
  Button
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {Table, Row, Rows} from 'react-native-table-component';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import Calcgeneration from './Calulategeneration';
import FileViewer from "react-native-file-viewer";

export default function Quotation() {
  var d = new Date();
  const [cols, setCols] = useState([
    'Year',
    '1',
    '2',
    '3',
    '4',
    '5',
    '10',
    '15',
    '20',
    '25',
  ]);
  const [name, setName] = useState('');
  const [moduleSize, setModuleSize] = useState('335');
  const [des, setDes] = useState('Mr');
  const [ugperyear, setUgperyear] = useState(0);
  const [rows, setRows] = useState([
    ['Unit Charges', 7.5, 7.58, 7.65, 7.73, 7.8, 8.18, 8.6, 9.03, 9.49],
    [
      'Unit Generation per year',
      '2',
      '3',
      '4',
      '5',
      '6',
      '7',
      '8',
      '9',
      '10',
    ],
    ['Total Generation', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
    ['Total Saving', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
  ]);
  const [systemcap, setSystemcap] = useState(0);
  const [noofmod, setNoofmod] = useState('');
  const [rateperkw, setRateperkw] = useState();
  const [valforfortysubsidy, setvalueforfortysubsidy] = useState(0);
  const [valfortwentysubsidy, setvaluefortwentysubsidy] = useState(0);
  const [superelevated, setsuperelevated] = useState(0);
  const [frankingcharges, seFrankingcharges] = useState();
  const [generationcapacity, setGenerationcapacity] = useState(1500);
  const [ref, setRef] = useState('');


  const Calculategensummary = () => {

    let multiplywith = moduleSize === '335' ? 1500 : 1700;
    var row = systemcap * multiplywith;
    console.log(row);
    var secgenperyear = Calcgeneration(row);
    var thirdgenperyear = Calcgeneration(secgenperyear);
    var fourthgenperyear = Calcgeneration(thirdgenperyear);
    var fifthgenperyear = Calcgeneration(fourthgenperyear);
    var tenthgenperyear = Calcgeneration(fifthgenperyear);
    var fifteengenperyear = Calcgeneration(tenthgenperyear);
    var twentygenperyear = Calcgeneration(fifteengenperyear);
    var twentyfivegenperyear = Calcgeneration(twentygenperyear);
    var secgen = parseInt(row + secgenperyear);
    var thirdgen = parseInt(secgen + thirdgenperyear);
    var fourthgen = parseInt(thirdgen + fourthgenperyear);
    var fifthgen = parseInt(fourthgen + fifteengenperyear);
    var tenthgen = parseInt(fifthgen + tenthgenperyear);
    var fifteengen = parseInt(tenthgen + fifteengenperyear);
    var twentygen = parseInt(fifteengen + twentygenperyear);
    var twentyfivegen = parseInt(twentygen + twentyfivegenperyear);
    var onetotsaving = row * 7.5;
    var twototsaving = parseInt(onetotsaving + secgenperyear*7.58);
    var threetotsaving = parseInt(twototsaving + thirdgenperyear*7.65);
    var fourtotsaving = parseInt(threetotsaving + fourthgenperyear*7.73);
    var fifthtotsaving = parseInt(fourtotsaving + fifthgenperyear*7.80);
    var tenthtotsaving = parseInt(fifthtotsaving + tenthgenperyear*8.19);
    var fifteenthtotsaving = parseInt(tenthtotsaving + fifteengenperyear*8.6);
    var twentytotsaving = parseInt(fifteenthtotsaving + twentygenperyear*9.03);
    var twentyfivetotsaving = parseInt(twentytotsaving + twentyfivegenperyear*9.49);
  
    setRows([
      ['Unit Charges', 7.5, 7.58, 7.65, 7.73, 7.8, 8.18, 8.6, 9.03, 9.49],
      [
        'Unit Generation per year',
        row,
        secgenperyear,
        thirdgenperyear,
        fourthgenperyear,
        fifthgenperyear,
        tenthgenperyear,
        fifteengenperyear,
        twentygenperyear,
        twentyfivegenperyear,
      ],
      ['Total Generation', row, secgen, thirdgen, fourthgen, fifthgen, tenthgen, fifteengen, twentygen, twentyfivegen],
      ['Total Saving', onetotsaving, twototsaving, threetotsaving, fourtotsaving, fifthtotsaving, tenthtotsaving, fifteenthtotsaving, twentytotsaving, twentyfivetotsaving],
    ])
  }


  const createPDF = async () => {
    console.log('Here');
    let options = {
      html: `
      <html>
      <head>
        <style>
        table {
          font-family: arial, sans-serif;
          border-collapse: collapse;
          width: 100%;
        }

        td, th {
          border: 1px solid #dddddd;
          text-align: left;
          padding: 8px;
        }

        tr:nth-child(even) {
          background-color: #dddddd;
        }
        img {
          display: block;
          margin-left: auto;
          margin-right: auto;
        }
        </style>
      </head>


      <img src="https://www.linkpicture.com/q/a50ba55a-0a18-4cce-8533-c295212e7fd8.jpg" width="250" height="200" />
      <h1>SPARCO MULTIPLAST PVT LTD
      (DIVISON-ENERGY)</h1>
      <hr></hr>
      <h3>Ref No. SMPL/${ref}/22-23</h3>
      <h5>${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}</h5>
      <hr/>
      <h2>Executive summary</h2>
      <h3>Based on the load analysis, SPARCO Energy  proposes the following Installation At, 
      </h3>
      <hr/>
      <h3>${des} ${name} </h3>
      <table>
        <tr>
        <td>1</td>
        <th>System Capacity</th>
        <td>${systemcap} KW</td>
        </tr>
        <tr>
        <td>2</td>
        <th>Type</th>
        <td>Rooftop grid system tied without batteries</td>
        </tr>
        <tr>
        <td>3</td>
        <th>Weight & area required</th>
        <td>The weight of the Solar system is @20kg/m2
        The area required will be @ 100sq ft/MW</td>
        </tr>
        <tr>
        <td>4</td>
        <th>Mounting structure</th>
        <td>Panels shall be mounted on galvanized frames inclined at 18-23 degrees to the south <br/> 
        The structure is designed in such a manner that module can be replaced easily and in line with site requirements <br/> 
        and it is easy to install and service in future.</td>
        </tr>
        <tr>
        <td>5</td>
        <th>Generation Capacity</th>
        <td>Approx ${generationcapacity} / KW year</td>
        </tr>
        <tr>
        <td>6</td>
        <th>Panel degrade</th>
        <td> 1% each year</td>
        </tr>
        <tr>
        <td>7</td>
        <th>Benefits</th>
        <td>40% Subsidy Upto 1kw to 3kw .20% Subsidy Above 3kw to 10 kw   </td>
        </tr>
        </table>
        <br />
        <hr />
        <br />
        <br />
        <h2><u>Saving Calculation</u></h2>
        <table>
        <tr>
        <th>Project Capacity</th>
        <td>${systemcap} </td>
        </tr>
        <tr>
        <th>Module Size </th>
        <td>${moduleSize} </td>
        </tr>
        <tr>
        <th>Number Of Module</th>
        <td>${parseFloat(systemcap / (parseFloat(moduleSize) / 1000))} </td>
        </tr>
        <tr>
        <th>Total  Watt</th>
        <td>${systemcap * 1000} </td>
        </tr>
        <tr>
        <th>Invertor Size</th>
        <td>${parseFloat(systemcap)}</td>
        </tr>
      </table>
      <hr />
      <br />
      <table>
      <tr>
      <th>Year</th>
      <td>1</td>
      <td>2</td>
      <td>3</td>
      <td>4</td>
      <td>5</td>
      <td>10</td>
      <td>15</td>
      <td>20</td>
      <td>25</td>
      </tr>
      <tr>
      <th>Unit Charges</th>
      <td>7.5</td>
      <td>7.58</td>
      <td>7.65</td>
      <td>7.73</td>
      <td>7.80</td>
      <td>8.19</td>
      <td>8.60</td>
      <td>9.03</td>
      <td>9.49</td>
      </tr>
      <tr>
      <th>Unit Generation per year</th>
      <td>${rows[1][1]}</td>
      <td>${rows[1][2]}</td>
      <td>${rows[1][3]}<//td>
      <td>${rows[1][4]}</td>
      <td>${rows[1][5]}</td>
      <td>${rows[1][6]}</td>
      <td>${rows[1][7]}</td>
      <td>${rows[1][8]}</td>
      <td>${rows[1][9]}</td>
      </tr>
      <tr>
      <th>Total Generation</th>
      <td>${rows[2][1]}</td>
      <td>${rows[2][2]}</td>
      <td>${rows[2][3]}</td>
      <td>${rows[2][4]}</td>
      <td>${rows[2][5]}</td>
      <td>${rows[2][6]}</td>
      <td>${rows[2][7]}</td>
      <td>${rows[2][8]}</td>
      <td>${rows[2][9]}</td>
      </tr>
      <tr>
      <th>Total Saving</th>
      <td>${rows[3][1]}</td>
      <td>${rows[3][2]}</td>
      <td>${rows[3][3]}</td>
      <td>${rows[3][4]}</td>
      <td>${rows[3][5]}</td>
      <td>${rows[3][6]}</td>
      <td>${rows[3][7]}</td>
      <td>${rows[3][8]}</td>
      <td>${rows[3][9]}</td>
      </tr>
      
      </table>
      <br />
      <br />
      <hr />
      <h2><u>Required Document for registration</u></h2>
      <h3>1). Electricity Bill</h3>
      <h3>2). Property Tax Bill/Index copy/Dastavej copy</h3>
      <h3>3). Aadhaar card</h3>
      <h3>4). Pan Card</h3>
      <h3>5). Cancel cheque</h3>
      <br />
      
      <hr />
      <br />

      <h2><u>Scope of work and commerical detail</u></h2>
      <table>
      <tr>
      <th>Sr No.</th>
      <th>Details </th>
      <th>Rate per KW in INR </th>
      <th> OTY .KW </th>
      <th>Total INR </th>
      </tr>
      <tr>
      <td>1</td>
      <td>Design, engineering, procurement and supply of grid-connected rooftop solar photovoltaic (PV) system. This includes all necessary equipment required for satisfactory installation and operation of the system, such as:
      - Solar Mono DCR PV modules (Adani 520 WP)
      - Grid-connected inverter, (Foxess,Growatt)
      - Normal Module mounting structure,
      - AC/DC junction boxes, if applicable,
      - AC & DC cables,
      - Installation accessories, etc.</td>
      <td>${rateperkw}</td>
      <td>${systemcap}</td>
      <td>${rateperkw * systemcap}</td>
      </tr>
      <tr>
      <td>2</td>
      <td>Installation and commissioning of grid-connected rooftop solar photovoltaic (PV) system. This includes all necessary works for satisfactory installation and operation of the system, such as:
      - Electrical installation,
      -  Civil works, etc.</td>
      <td>Inclusive</td>
      <td>Inclusive</td>
      <td>Inclusive</td>
      </tr>
      <tr>
      <td>3</td>
      <td>GST Tax</td>
      <td>  </td>
      <td>13.80%</td>
      <td>${parseFloat(0.138 * rateperkw * systemcap).toFixed(2)}</td>
      </tr>
      <tr>
      <td>4</td>
      <td>Super elevated structure</td>
      <td>${superelevated}</td>
      <td>${systemcap}</td>
      <td>${(superelevated*systemcap).toFixed(2)}</td>
      </tr>
      <tr>
      <td>5</td>
      <td>40% Subsidy upto (1 to 3 kw )</td>
      <td></td>
      <td></td>
      <td>${valforfortysubsidy.toFixed(2)}</td>
      </tr>
      <tr>
      <td>6</td>
      <td>20% Subsidy Above  (3 to 10kw )</td>
      <td></td>
      <td></td>
      <td>${valfortwentysubsidy.toFixed(2)}</td>
      </tr>
      <tr>
      <td>7</td>
      <td>Total Subsidy (40%+20%)</td>
      <td></td>
      <td></td>
      <td>${(valforfortysubsidy + valfortwentysubsidy).toFixed(2)}</td>
      </tr>
      <tr>
      <td>8</td>
      <td>Discom connectivity Charges</td>
      <td></td>
      <td></td>
      <td>Extra at Actual</td>
      </tr>
      <tr>
      <td>9</td>
      <td>Franking Charges(PPA Agreement)</td>
      <td></td>
      <td></td>
      <td>${frankingcharges}</td
      </tr>
      <tr>
      <td>10</td>
      <th>Total contract Price after deduction of subsidy amount </th>
      <td></td>
      <td></td>
      <td>${parseFloat(
        rateperkw * systemcap +
          parseFloat(frankingcharges) -
          (valforfortysubsidy + valfortwentysubsidy).toFixed(2) +
          systemcap * superelevated +
          parseFloat(0.138 * rateperkw * systemcap),
      )}</td>
      </tr>

      </table>
      <br />
      <hr />
      <h3><u>Completion Period and Time Frame:-</u></h3>
      <h5>• Upon submission of the application Document along with the Registration Fee (token 20% ), it will take an estimated time of 2-3 (week) <br/>  to receive the necessary approvals After OTP generation . </h5>
      <h5>• Once the necessary approvals/ NOC are received, the Client will make “Payment 2”(Rest amount ) to SPARCO Energy . Upon the receipt of “Payment 2”, 
      SMPL shall complete the installation within 2-3(months) and intimate the Distribution Company/ Gov. for inspection & commissioning Process.</h5>
      <br />
      <hr />
      <h3><u>Warranty:-</u></h3>
      <h5><strong>• Mono DCR PV Modules</strong>:- Performance Warranty: 25 years 90% during first 10 years, 80% during next 15 years on the rated power output.</h5>
      <h5><strong>• Grid-tied Inverter</strong>:- (sixty) months from the date of commissioning of the plant.</h5>
      <h5><strong>• Overall PV system - 2(Two) years from the date of commissioning on overall workmanship and performance of the PV system as per Tender Terms.</strong></h5>
      <br />
      <br />
      <br />
      <hr />
      <br />
      <br />
      <h2><u>TECHNICAL SPECIFICATION FOR ROOFTOP SOLAR SYSTEM</u></h2>
      <table>
        <tr>
        <th>SOLAR PANEL</th>
        <td>A Mono DCR PV module has solar cells that convert sunlight directly into DC electricity. The Mono DCR PV module is the heart of the solar technology.
        • Technology: Multi-crystalline silicon 
       • Grade A Silicon Cell with 18.4% High Efficiency.  
       Performance Warranty: 25 years, 90% during first 10 years, 80% during next 15 years
       • Make: ADANI ${systemcap} WP 
       Warranty: 25 Years Generation Warranty</td>
        </tr>
        <tr>
        <th>Module Mounting Structure</th>
        <td>Module mounting structures are used to mount PV modules in place.
        • Our mounting structures are made of High quality hot-dip galvanized mild-steel, designed to last through the life of the PV system. 
       Vertical Support: 50X50MM Square Pipe
       Horizontal Support: 40X40MM Square Pipe 
       • All fasteners are made of stainless steel in order to avoid any corrosion issues. 
       • Mounting structure is designed to withstand a wind speed of 150 km/hr.</td>
        </tr>
        <tr>
        <th>Solar Inverter</th>
        <td>A grid-tied PV inverter is the brain of the PV system, which: 
        • Extracts the maximum DC power from the PV modules using a maximum power point tracking (MPPT) mechanism; 
        • Converts the DC power into AC power; 
        • Offers the necessary safety features on both PV system (DC) and grid (AC)-side. 
        • Maximum Efficiency: 97.7% 
        • Life time free online data monitoring through Wi-Fi on mobile and desktop. 
        • Warranty: 7 years 
        • Make: - Foxess,Growatt
        </td>
        </tr>
        <tr>
        <th>Solar Junction Box</th>
        <td>DC and AC-side junction boxes are used to connect equipment such as strings of PV modules in parallel or inverters in parallel, if needed.
        • They also house the necessary protection equipment, if not already present in inverters, such as: - (+)ve and (–)ve DC terminal fuses from PV modules - Surge protection devices (SPD) - DC disconnection switch
        • Our junction boxes are made of polycarbonate, which are rated IP65 for outdoor and indoor use.
        Make:-Schneider / EATON / L&T or equivalent</td>
        </tr>
        <tr>
        <br />
        <br />
        <th>AC & DC Switch</th>
        <td>
        DC and AC-side junction boxes are used to connect equipment such as strings of PV modules in parallel or inverters in parallel, if needed. 
        • They also house the necessary protection equipment, if not already present in inverters, such as: 
        - (+) ve and (–) ve DC terminal fuses from PV modules 
        - Surge protection devices (SPD) 
        
        - DC disconnection switch 
        • Our junction boxes are made of polycarbonate, which are rated IP65 for outdoor and indoor use 
        • Make: -Schneider or equivalent
        </td>
        </tr>
        <tr>
        <th>Weight & Area Required</th>
        <td>The weight of the Solar system is @20kg/m2 the area required will be @100sq ft/kW.</td>
        </tr>
        <tr>
        <th>Mounting Structure</th>
        <td>Panels shall be mounted on galvanized frames inclined at 15-20 degrees to the south.
        The structure is designed in such a manner that module can be replaced easily and in line with site requirements and 
        it is easy to install and service in future.</td>
        </tr>
        <tr>
        <th>AC & DC Cable</th>
        <td>TUV Approved high beam UV Protected tinned copper DC cable. (1C X 4Sq.MM)

        High quality PVC or XLPE(XLPO) Insulation AC Cable (2.5 or 4 Sq.mm).
        Make: - Polycab or Equivalent </td>
        </tr>
        <tr>
        <th>Meter</th>
        <td>The bi-directional electronic energy meter (net meter) will be installed for the measurement of import/ export of energy as per regulations of the Distribution Company. • Accuracy class of net meter: 0.5s
        • The unidirectional solar meter will be installed for the measurement of 
        solar energy generation as per regulations of the Distribution Company.</td>
        </tr>
        <tr>
        <th>Miscellaneous</th>
        <td>
        • PVC Pipe Flexible
        • Saddle (Standard Packing) & Cable Tie
        • Earthing Material, Cable Trays,
        • Terminal Material etc. as per standard electrical requirement</td>
        </tr>
        <tr>
        <th>Energy Generation / Year </th>
        <td>${generationcapacity} Units/year (Tentative) for 1 KW System</td>
        </tr>
      </table>
      <img src="https://www.linkpicture.com/q/a50ba55a-0a18-4cce-8533-c295212e7fd8.jpg" width="250" height="200" style="margin-top: 20px"/>
      </html>


      


       `,
      fileName: name,
      directory: 'Documents',
    };

  let file = await RNHTMLtoPDF.convert(options);
  const pathtoopen = FileViewer.open(file.filePath, { showOpenWithDialog: true }) // absolute-path-to-my-local-file.
  .then(() => {
    console.log('Opened')
  })
  .catch((error) => {
    console.log(error);
  });
    // console.log(file.filePath);
    
  };

  useEffect(() => {
    let total = systemcap - 3;
    if (total <= 0) {
      setvalueforfortysubsidy(
        systemcap * rateperkw + parseFloat(0.138 * rateperkw * systemcap) * 0.4,
      );
    } else if (total > 0 && total <= 7) {
      setvalueforfortysubsidy(
        (3 * rateperkw + parseFloat(0.138 * rateperkw * 3)) * 0.4,
      );
      setvaluefortwentysubsidy(
        (total * rateperkw + parseFloat(0.138 * rateperkw * total)) * 0.2,
      );
    } else if (total > 7) {
      setvalueforfortysubsidy(
        (3 * rateperkw + parseFloat(0.138 * rateperkw * 3)) * 0.4,
      );
      setvaluefortwentysubsidy(
        (7 * rateperkw + parseFloat(0.138 * rateperkw * 7)) * 0.2,
      );
    }
  }, [systemcap, rateperkw]);

  
      

  

  return (
    <ScrollView>
      <View style={{flex: 1}}>
        <View style={{paddingLeft: 10, marginTop: 10}}>
          <Image
            style={{height: 90, width: 90}}
            source={require('../Assets/Sparcologo.jpg')}
            resizeMode="stretch"
          />
        </View>
        <TextInput
          placeholder="Enter value"
          style={{height: 40, fontSize: 17,paddingHorizontal:10,marginTop:20}}
          value={ref}
          onChangeText={text => setRef(text)}
        />
        <View
          style={{
            paddingHorizontal: 10,
            marginTop: 10,
          }}>
          <Text style={{fontSize: 20, fontWeight: '500', color: 'black'}}>
            Ref No. SMPL/{ref}/22-23
          </Text>
          <Text style={{fontSize: 20, fontWeight: '500', color: 'black'}}>
            Date:- {d.getDate()}/{d.getMonth() + 1}/{d.getFullYear()}
          </Text>
        </View>
        <View style={{paddingHorizontal: 10}}>
          <Text
            style={{
              fontWeight: '600',
              fontSize: 30,
              color: 'black',
              marginTop: 20,
            }}>
            Executive Summary
          </Text>
          <Text style={{marginTop: 10}}>
            Based on the load analysis, SMPL proposes the following installation
            At:-
          </Text>
          <View style={{flexDirection: 'row', width: '100%'}}>
            <Picker
              style={{width: '30%'}}
              selectedValue={des}
              onValueChange={(itemValue, itemIndex) => setDes(itemValue)}>
              <Picker.Item label="Mr." value="Mr." />
              <Picker.Item label="Ms." value="Ms." />
              <Picker.Item label="Mrs." value="Mrs." />
            </Picker>
            <TextInput
              style={{height: 60, width: '68%'}}
              placeholder="Enter name here"
              value={name}
              onChangeText={text => setName(text)}
            />
          </View>
        </View>
        <View
          style={{
            paddingHorizontal: 10,
            marginTop: 12,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <Text style={{color: 'black', fontSize: 20}}>1. System Capacity</Text>
          <TextInput
            placeholder="Enter value"
            style={{height: 40, fontSize: 17}}
            value={systemcap}
            onChangeText={text => setSystemcap(text)}
          />
        </View>
        <View
          style={{
            paddingHorizontal: 10,
            marginTop: 12,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Text style={{color: 'black', fontSize: 20}}>2. Type</Text>
          <Text style={{justifyContent: 'center', fontSize: 18}}>
            Rooftop grid system without batteries
          </Text>
        </View>
        <View
          style={{
            paddingHorizontal: 10,
            marginTop: 18,
            justifyContent: 'space-between',
          }}>
          <Text style={{color: 'black', fontSize: 20}}>
            3. Weight & Area required:-
          </Text>
          <Text style={{justifyContent: 'center', fontSize: 18, marginTop: 5}}>
            The weight of the solar system is @20kg/m2.
          </Text>
          <Text style={{justifyContent: 'center', fontSize: 18}}>
            The area required will be @100 sq ft/KW.
          </Text>
        </View>
        <View
          style={{
            paddingHorizontal: 10,
            marginTop: 18,
            justifyContent: 'space-between',
          }}>
          <Text style={{color: 'black', fontSize: 20}}>
            4. Mounting Structure:-
          </Text>
          <Text style={{justifyContent: 'center', fontSize: 18, marginTop: 5}}>
            Panels should be mounted on galvanized frames inclined at 18-23
            degrees to the south The structure is designed in such a manner that
            module can be replaced easily and in line with site requirements and
            it is easy to install and service in future.
          </Text>
        </View>
        <View
          style={{
            paddingHorizontal: 10,
            marginTop: 12,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Text style={{color: 'black', fontSize: 20}}>
            5. Generation Capacity
          </Text>
          <Text>{moduleSize === '335' ? 1500 : 1700}</Text>
        </View>
        <View style={{paddingHorizontal: 10}}>
          <Text
            style={{
              fontWeight: '600',
              fontSize: 30,
              color: 'black',
              marginTop: 20,
            }}>
            Project Summary
          </Text>
          <View
            style={{
              marginTop: 12,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <Text style={{color: 'black', fontSize: 20}}>
              Total Project Capacity
            </Text>
            <TextInput
              placeholder="Enter value"
              style={{height: 40, fontSize: 17}}
              value={systemcap}
              onChangeText={text => setSystemcap(text)}
            />
          </View>
          <View
            style={{
              marginTop: 12,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <Text style={{color: 'black', fontSize: 20}}>Module Size</Text>
            <Picker
              style={{width: '30%', marginTop: -10}}
              selectedValue={moduleSize}
              onValueChange={(itemValue, itemIndex) => {
                setModuleSize(itemValue);
                setGenerationcapacity(moduleSize === '335' ? 1500 : 1700);
              }}>
              <Picker.Item label="335" value="335" />
              <Picker.Item label="520" value="520" />
            </Picker>
          </View>
          <View
            style={{
              marginTop: 12,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <Text style={{color: 'black', fontSize: 20}}>Number of Module</Text>
            <Text style={{color: 'black', fontSize: 20}}>
              {parseFloat(systemcap / (parseFloat(moduleSize) / 1000))}
            </Text>
          </View>
          <View
            style={{
              marginTop: 20,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <Text style={{color: 'black', fontSize: 20}}>Inverter Size</Text>
            <Text style={{color: 'black', fontSize: 20}}>
              {parseFloat(systemcap)}
            </Text>
          </View>
        </View>
        <View style={{paddingHorizontal: 10}}>
          <Text
            style={{
              fontWeight: '600',
              fontSize: 30,
              color: 'black',
              marginTop: 20,
            }}>
            Solar Generation Summary
          </Text>
          <Table borderStyle={{borderWidth: 1, borderColor: '#ffa1d2'}}>
            <Row
              data={cols}
              style={styles.HeadStyle}
              textStyle={styles.TableText}
            />
            <Rows
              data={rows}
              textStyle={styles.TableText}
              style={styles.RowStyle}
            />
          </Table>
        </View>
        <View style={{paddingHorizontal: 10}}>
          <Text
            style={{
              fontWeight: '600',
              fontSize: 30,
              color: 'black',
              marginTop: 20,
            }}>
            Required Documents for Verification
          </Text>
          <Text style={{color: 'black', fontSize: 17, marginTop: 10}}>
            Electricity Bill
          </Text>
          <Text style={{color: 'black', fontSize: 17, marginTop: 8}}>
            Property Tax Bill/ Index Copy/ Dastavej Copy
          </Text>
          <Text style={{color: 'black', fontSize: 17, marginTop: 8}}>
            Passport Size photo
          </Text>
          <Text style={{color: 'black', fontSize: 17, marginTop: 8}}>
            Aadhaar card
          </Text>
          <Text style={{color: 'black', fontSize: 17, marginTop: 8}}>
            Pan card
          </Text>
          <Text style={{color: 'black', fontSize: 17, marginTop: 8}}>
            Cancel cheque
          </Text>
        </View>
        <View style={{paddingHorizontal: 10}}>
          <Text
            style={{
              fontWeight: '600',
              fontSize: 30,
              color: 'black',
              marginTop: 20,
            }}>
            Scope of Work and Commercial Detail
          </Text>
        </View>
        <View style={{paddingHorizontal: 10}}>
          <Text style={{color: 'black', fontSize: 17, marginTop: 10}}>
            1). Design,engineering,procurement and supply of grid-connected
            rooftop solar photo voltaic (PV) system.This includes all necessary
            equipment required for satisfactory installation and operation of
            the system such as
          </Text>
          <Text>Grid-connected inverter</Text>
          <Text>Normal module mounting structure</Text>
          <Text>AC/DC junction boxes,if applicable</Text>
          <Text>AC & DC Cables</Text>
          <Text>Installation accessories,etc</Text>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={{color: 'black'}}>Rate/KW:-</Text>
            <TextInput
              placeholder="Enter value"
              style={{height: 40, fontSize: 17}}
              value={rateperkw}
              onChangeText={price => setRateperkw(price)}
            />
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={{color: 'black'}}>Quantity:-</Text>
            <Text style={{color: 'black'}}> {systemcap}</Text>
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={{color: 'black'}}>Total Amount:- </Text>
            <Text style={{color: 'black'}}>{rateperkw * systemcap}</Text>
          </View>
        </View>
        <View style={{paddingHorizontal: 10}}>
          <Text style={{color: 'black', fontSize: 17, marginTop: 10}}>
            2). Installation and commissioning of grid-connected rooftop solar
            photovolaic(PV) system.This includes all necessary works for
            satisfactory installation and operation of the system such as:
          </Text>
          <Text>Electrical installation</Text>
          <Text>Civil works,etc.</Text>
        </View>
        <View style={{paddingHorizontal: 10}}>
          <Text style={{color: 'black', fontSize: 17, marginTop: 10}}>
            3). GST TAX.
          </Text>
          <View
            style={{flexDirection: 'row', alignItems: 'center', marginTop: 10}}>
            <Text style={{color: 'black'}}>Rate/KW:-</Text>
            <Text style={{color: 'black'}}>13.80%</Text>
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={{color: 'black'}}>Total Amount:-</Text>
            <Text style={{color: 'black'}}>
              {parseFloat(0.138 * rateperkw * systemcap).toFixed(2)}
            </Text>
          </View>
        </View>
        <View style={{paddingHorizontal: 10}}>
          <Text style={{color: 'black', fontSize: 17, marginTop: 10}}>
            4) 40% Subsidy
          </Text>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={{color: 'black'}}>
              {valforfortysubsidy.toFixed(2)}
            </Text>
          </View>
        </View>
        <View style={{paddingHorizontal: 10}}>
          <Text style={{color: 'black', fontSize: 17, marginTop: 10}}>
            4) 20% Subsidy
          </Text>
          <Text style={{color: 'black'}}>{valfortwentysubsidy.toFixed(2)}</Text>
        </View>
        <View style={{paddingHorizontal: 10}}>
          <Text style={{color: 'black', fontSize: 17, marginTop: 10}}>
            5) Total Subsidy
          </Text>
          <Text style={{color: 'black'}}>
            {(valforfortysubsidy + valfortwentysubsidy).toFixed(2)}
          </Text>
        </View>
        <View style={{paddingHorizontal: 10}}>
          <Text style={{color: 'black', fontSize: 17, marginTop: 10}}>
            6) Super elevated structure
          </Text>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={{color: 'black'}}>Rate/KW:-</Text>
            <TextInput
              placeholder="Enter value"
              style={{height: 40, fontSize: 17}}
              value={superelevated}
              onChangeText={text => setsuperelevated(text)}
            />
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={{color: 'black'}}>Quantity:- </Text>
            <Text style={{color: 'black'}}>{systemcap}</Text>
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={{color: 'black'}}>Total Amount:- </Text>
            <Text style={{color: 'black'}}>{parseFloat(systemcap * superelevated).toFixed(2)}</Text>
          </View>
        </View>
        <View style={{paddingHorizontal: 10}}>
          <Text style={{color: 'black', fontSize: 17, marginTop: 10}}>
            7) DISCOM Connectivity Charges
          </Text>
          <Text style={{color: 'black'}}>Extra At actual</Text>
        </View>
        <View style={{paddingHorizontal: 10}}>
          <Text style={{color: 'black', fontSize: 17, marginTop: 10}}>
            8) Franking charges (PPA Agreement)
          </Text>
          <TextInput
            placeholder="Enter value"
            style={{height: 40, fontSize: 17}}
            value={frankingcharges}
            onChangeText={text => seFrankingcharges(text)}
          />
          <View>
            <Text style={{color: 'black', fontSize: 17, marginTop: 10}}>
              9) .Total Amount
            </Text>
            <Text style={{color: 'black'}}>
              {parseFloat(
                rateperkw * systemcap +
                  parseFloat(frankingcharges) -
                  (valforfortysubsidy + valfortwentysubsidy).toFixed(2) +
                  systemcap * superelevated +
                  parseFloat(0.138 * rateperkw * systemcap),
              )}
            </Text>
          </View>
          <View style={{width:200,alignItems:'center',alignSelf:'center',marginTop:30}}>
          <Button onPress={Calculategensummary} style={{alignSelf:'center',width:200}} title="Calculate Generation"/>
          </View>
          <View style={{width:200,alignItems:'center',alignSelf:'center',marginTop:30,marginBottom:20}}>
          <Button onPress={createPDF} style={{alignSelf:'center',width:200}} title="Create PDF"/>
          </View>
        
          

         
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  HeadStyle: {
    height: 90,
    width: '100%',
    alignContent: 'flex-end',
    backgroundColor: '#ffe0f0',
  },
  RowStyle: {
    height: 90,
    width: '100%',
    alignContent: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
  },
  TableText: {
    margin: 0,
    fontSize: 10,
    alignItems: 'center',
  },
});
