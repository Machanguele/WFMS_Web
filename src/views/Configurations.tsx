import * as React from "react";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import TabContext from '@mui/lab/TabContext';
import TabPanel from '@mui/lab/TabPanel';
import UsersComponent from "./Users";
import Departament from "./Departament";

export const Configurations = () => {
     const [value, setValue] = React.useState('one');

     const handleChange = (event: React.SyntheticEvent, newValue: string) => {
          setValue(newValue);
     };

     return(
         <div className="content content-center">
              <Box>
                   <TabContext value={value}>
                        <Box sx={{marginLeft: '2%', fontWeight: 'bold' }} >
                             <Tabs
                                 TabIndicatorProps={{
                                      style: {
                                           backgroundColor: value==='one'?"#F39C12": value==='two'?'#2E86C1':'#8E44AD',
                                           borderWidth: 4,
                                      }
                                 }}
                                 value={value}
                                 onChange={handleChange}
                                 textColor="primary"
                                 indicatorColor="primary"
                                 aria-label="secondary tabs example"
                                 centered={true}
                             >
                                  <Tab value="one" label="Utilizadores" style={{color: '#167415', textTransform: 'none'}} />
                                  <Tab
                                      value="two"
                                      label="Gestão de componentes "
                                      style={{color: '#167415',  textTransform: 'none', marginLeft: '1%', marginRight: '1%'}}

                                  />
                                  <Tab value="three" label="Tipos de actividades" style={{color: '#167415', textTransform: 'none'}}/>
                             </Tabs>
                        </Box>

                        <TabPanel value="one">
                             <UsersComponent/>
                        </TabPanel>

                        <TabPanel value="two">
                             <UsersComponent />
                        </TabPanel>
                        <TabPanel value="three">
                             <Departament />
                        </TabPanel>
                   </TabContext>
              </Box>
         </div>
     )
};