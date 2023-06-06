/*!
  _   _  ___  ____  ___ ________  _   _   _   _ ___
 | | | |/ _ \|  _ \|_ _|__  / _ \| \ | | | | | |_ _|
 | |_| | | | | |_) || |  / / | | |  \| | | | | || |
 |  _  | |_| |  _ < | | / /| |_| | |\  | | |_| || |
 |_| |_|\___/|_| \_\___/____\___/|_| \_|  \___/|___|

=========================================================
* Horizon UI - v1.1.0
=========================================================

* Product Page: https://www.horizon-ui.com/
* Copyright 2022 Horizon UI (https://www.horizon-ui.com/)

* Designed and Coded by Simmmple

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

// Chakra imports
import {
  // Avatar,
  Box,
  Flex,
  // FormLabel,
  Icon,
  Select,
  SimpleGrid,
  useColorModeValue,
} from '@chakra-ui/react';
// Assets
// import Usa from 'assets/img/dashboards/usa.png';
// Custom components
// import MiniCalendar from 'components/calendar/MiniCalendar';
import MiniStatistics from 'components/card/MiniStatistics';
import IconBox from 'components/icons/IconBox';
import React, { useEffect, useState } from 'react';
import i18n from 'i18n';
import {
  // MdAddTask,
  MdOutlinePersonAddAlt,
  // MdFileCopy,
  // MdOutlinePeople,
  MdOutlinePersonOff,
  MdPeopleAlt,
  MdPersonOff,
  MdPersonAddAlt1
} from 'react-icons/md';
import { IoPeopleOutline } from 'react-icons/io5';
import ComplexTable from 'views/admin/default/components/ComplexTable';
// import DailyTraffic from 'views/admin/default/components/DailyTraffic';
import PieCard from 'views/admin/default/components/PieCard';
// import Tasks from 'views/admin/default/components/Tasks';
import TotalSpent from 'views/admin/default/components/TotalSpent';
import WeeklyRevenue from 'views/admin/default/components/WeeklyRevenue';
// import {
// columnsDataCheck,
//   columnsDataComplex,
// } from 'views/admin/default/variables/columnsData';
import { FaRegIdCard, FaRegCreditCard } from 'react-icons/fa';
// import tableDataCheck from 'views/admin/default/variables/tableDataCheck';
// import tableDataComplex from 'views/admin/default/variables/tableDataComplex';
import { getEmployee, getEmployeeWithStatusActive } from 'utils/api/employee';
import { getEmployeeWithStatusPassive } from 'utils/api/ArchiveEmployee';
import { getCardsWithStatusTrue, getCardWithStatusFalse } from 'utils/api/Card';
import { getManagersWithStatusActive } from 'utils/api/Manager';
import { getManagersWithStatusPassive } from 'utils/api/ArchiveManagers';
import { getChecks } from 'utils/api/Check';
import { useTranslation } from 'react-i18next';
// import Sidebar from 'components/sidebar/Sidebar';

const UserReports = () => {
  // Chakra Color Mode
  const brandColor = useColorModeValue('brand.500', 'white');
  const boxBg = useColorModeValue('secondaryGray.300', 'whiteAlpha.100');

  const { t } = useTranslation();

  const [language, setLanguage] = useState(localStorage.getItem('language') || 'al');

  function toggleLanguage() {
    if (language === 'al') {
      setLanguage('en');
      i18n.changeLanguage('en');
    } else if (language === 'en') {
      setLanguage('ch');
      i18n.changeLanguage('ch');
    } else {
      setLanguage('al');
      i18n.changeLanguage('al');
    }
  }

  useEffect(() => {
    localStorage.setItem('language', language);
    i18n.changeLanguage(language);
  }, [language]);

  const [employee, setEmployee] = useState();
  const [employeeActive, setEmployeeActive] = useState();
  const [employeePasive, setEmployeePasive] = useState();

  const getEmployees = async () => {
    const employee = await getEmployee();
    const employeeActive = await getEmployeeWithStatusActive();
    const employeePassive = await getEmployeeWithStatusPassive();
    setEmployee(employee.data.length);
    setEmployeeActive(employeeActive.data.length);
    setEmployeePasive(employeePassive.data.length);
  };

  const [cardActive, setCardActive] = useState();
  const [cardPassive, setCardPassive] = useState();

  const getCards = async () => {
    const cardsActive = await getCardsWithStatusTrue();
    const cardsPassive = await getCardWithStatusFalse();
    setCardActive(cardsActive.data.length);
    setCardPassive(cardsPassive.data.length);
  };

  const [managerActive, setManagerActive] = useState();
  const [managerPassive, setMAnagerPassive] = useState();

  const getManagers = async () => {
    const managersActive = await getManagersWithStatusActive();
    const managersPassive = await getManagersWithStatusPassive();
    setManagerActive(managersActive.data.length);
    setMAnagerPassive(managersPassive.data.length);
  };

  // get Check to table
  const columnsDataColumns = [
    {
      Header: t('checks:txt_tbl_firstname'),
      accessor: 'card.employee.firstName'
    },
    {
      Header: t('checks:txt_tbl_lastname'),
      accessor: 'card.employee.lastName'
    },
    {
      Header: t('checks:txt_tbl_card'),
      accessor: 'card.cardRefId'
    },
    {
      Header: t('checks:txt_tbl_checkDateTime'),
      accessor: 'checkDateTime'
    },
    {
      Header: t('checks:txt_tbl_serverDateTime'),
      accessor: 'serverDateTime'
    },
  ];

  const [checkTable, setCheckTable] = useState([]);

  const getCheck = async () => {
    try {
      const getChecksInOut = await getChecks();
      setCheckTable(getChecksInOut.data);
    } catch (error) {
      console.log(error, 'error from back');
    }
  };

  useEffect(() => {
    getManagers();
    getCards();
    getEmployees();
    getCheck();
  }, []);

  return (
    <>
      <Box pt={{ base: '130px', md: '80px', xl: '80px' }}>
        <SimpleGrid
          columns={{
            base: 1, md: 2, lg: 3, '2xl': 6
          }}
          gap="20px"
          mb="20px"
        >
          <MiniStatistics
            startContent={(
              <IconBox
                w="56px"
                h="56px"
                bg={boxBg}
                icon={
                  <Icon w="32px" h="32px" as={IoPeopleOutline} color={brandColor} />
                }
              />
            )}
            name={t('dashboard:text_employees')}
            value={employee}
          />
          <MiniStatistics
            startContent={(
              <IconBox
                w="56px"
                h="56px"
                bg={boxBg}
                icon={
                  <Icon w="32px" h="32px" as={MdOutlinePersonAddAlt} color="green" />
                }
              />
            )}
            name={t('dashboard:text_employees_active')}
            value={employeeActive}
          />
          <MiniStatistics
            startContent={(
              <IconBox
                w="56px"
                h="56px"
                bg={boxBg}
                icon={
                  <Icon w="32px" h="32px" as={MdOutlinePersonOff} color="red.700" />
                }
              />
            )}
            name={t('dashboard:text_employees_pasive')}
            value={employeePasive}
          />
          <MiniStatistics
            startContent={(
              <IconBox
                w="56px"
                h="56px"
                bg={boxBg}
                icon={
                  <Icon w="32px" h="32px" as={MdPeopleAlt} color={brandColor} />
                }
              />
            )}
            name={t('dashboard:text_managers')}
            value={managerActive + managerPassive}
          />
          <MiniStatistics
            startContent={(
              <IconBox
                w="56px"
                h="56px"
                bg={boxBg}
                icon={
                  <Icon w="32px" h="32px" as={MdPersonAddAlt1} color="green" />
                }
              />
            )}
            name={t('dashboard:text_managers_active')}
            value={managerActive}
          />
          <MiniStatistics
            startContent={(
              <IconBox
                w="56px"
                h="56px"
                bg={boxBg}
                icon={
                  <Icon w="32px" h="32px" as={MdPersonOff} color="red.700" />
                }
              />
            )}
            name={t('dashboard:text_managers_pasive')}
            value={managerPassive}
          />
          {/* <MiniStatistics growth="+23%" name="Sales" value="$574.34" /> */}
        </SimpleGrid>
        <SimpleGrid
          columns={{
            base: 1, md: 2, lg: 3, '2xl': 3
          }}
          gap="20px"
          mb="20px"
        >
          <MiniStatistics
            startContent={(
              <IconBox
                w="56px"
                h="56px"
                bg={boxBg}
                icon={
                  <Icon w="32px" h="32px" as={FaRegIdCard} color={brandColor} />
                }
              />
            )}
            name={t('dashboard:text_cards')}
            value={cardActive + cardPassive}
          />
          <MiniStatistics
            startContent={(
              <IconBox
                w="56px"
                h="56px"
                bg={boxBg}
                icon={
                  <Icon w="32px" h="32px" as={FaRegCreditCard} color="green" />
                }
              />
            )}
            name={t('dashboard:text_cards_active')}
            value={cardActive}
          />
          <MiniStatistics
            startContent={(
              <IconBox
                w="56px"
                h="56px"
                bg={boxBg}
                icon={
                  <Icon w="32px" h="32px" as={FaRegCreditCard} color="red.700" />
                }
              />
            )}
            name={t('dashboard:text_cards_pasive')}
            value={cardPassive}
          />

        </SimpleGrid>

        <SimpleGrid columns={{ base: 1, md: 2, xl: 2 }} gap="20px" mb="20px">
          <TotalSpent />
          <WeeklyRevenue />
        </SimpleGrid>
        <SimpleGrid columns={{ base: 1, md: 1, xl: 2 }} gap="20px" mb="20px">
          {checkTable.length > 0 && (
            <ComplexTable
              columnsData={columnsDataColumns}
              tableData={checkTable}
            />
          )}
          {/* <SimpleGrid columns={{ base: 1, md: 2, xl: 2 }} gap="20px"> */}
          {/* <DailyTraffic /> */}
          <PieCard />
          {/* </SimpleGrid> */}
        </SimpleGrid>
        {/* <SimpleGrid columns={{ base: 1, md: 1, xl: 2 }} gap="20px" mb="20px">
          <SimpleGrid columns={{ base: 1, md: 2, xl: 2 }} gap="20px">
            <Tasks />
            <MiniCalendar h="100%" minW="100%" selectRange={false} />
          </SimpleGrid>
        </SimpleGrid> */}
      </Box>
      <Box justifyContent="flex-end">
        <div style={{
          position: 'fixed', bottom: '2%', alignSelf: 'flex-end', right: '2%'
        }}
        >
          <Flex>
            <Select value={language} onChange={(e) => toggleLanguage(e.target.value)}>
              <option value="al">AL</option>
              <option value="en">EN</option>
              <option value="ch">CH</option>
            </Select>
          </Flex>
        </div>
      </Box>
    </>
  );
};

export default UserReports;
