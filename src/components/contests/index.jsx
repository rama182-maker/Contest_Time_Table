import React from "react";
import { useEffect, useMemo, useState } from "react";
import { useFilters, useGlobalFilter, useSortBy, useTable } from "react-table";
import axios from "axios";
import tw from "twin.macro";
import { GlobalFilter } from "./globalFilter";
import logo1 from "../../assets/images/hacker_rank.png";
import logo2 from "../../assets/images/code_chef.png";
import logo3 from "../../assets/images/codeforces.png";
import logo4 from "../../assets/images/kick_start.png";
import logo5 from "../../assets/images/at_coder.png";
import logo6 from "../../assets/images/icon.png";
import logo7 from "../../assets/images/top_coder.png";
import logo8 from "../../assets/images/cs_academy.png";
import logo9 from "../../assets/images/hacker_earth.png";
import logo10 from "../../assets/images/leet_code.png";

const F1 = tw.a`
  font-bold
  text-pink-500
  text-decoration-line: underline
  dark:text-link-dark
`
const Table = tw.table`
  table-fixed
  text-base
  text-gray-900
  dark:text-white
`;

const TableHead = tw.thead`
  p-3
  dark:text-white
`;

const TableRow = tw.tr`
border-2
border-purple-600
dark:text-white
dark:border-green-400
`;

const TableHeader = tw.th`
border-2
border-purple-600
p-3
dark:text-white
dark:border-green-400
`;

const TableBody = tw.tbody`
dark:text-white
`;

const TableData = tw.td`
border-2
border-purple-600
p-5
dark:text-white
dark:border-green-400
`;

const Button = tw.button`
  pl-4
  pr-4
  pt-2
  pb-2
  text-black
  rounded-md
  bg-red-300
  hover:bg-red-200
  transition-colors
`;
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const sites = ['HackerRank','CodeChef','Codeforces','Kick Start','AtCoder','CodeForces::Gym','TopCoder','CS Academy','HackerEarth','LeetCode'];
const srcs = ['logo1','logo2','logo3','logo4','logo5','logo6','logo7','logo8','logo9','logo10'];

export function Contests(props) {
    const [contests, setContests] = useState([]);
  
    const fetchContests = async () => {
      const response = await axios
        .get("https://kontests.net/api/v1/all")
        .catch((err) => console.log(err));
  
      if (response) {
        const contests = response.data;
  
        console.log("Contests: ", contests);
        setContests(contests);
      }
    };
   
    const contestData = useMemo(() => [...contests], [contests]);

    const contestColumns = useMemo(
        () =>
          contests[0]
            ? Object.keys(contests[0])
                .map((key) => {
                  if(key==="url")
                    return {
                      Header: key,
                      accessor: key,
                      Cell: ({ value }) => <F1 href={value} target="_blank">Try</F1>,
                    };
                    if(key==="status")
                      return {
                        Header: key,
                        accessor: key,
                        Cell : ({value}) => (value==="CODING") ? <a>live</a> :<a>upcoming</a>
                      }
                    if(key==="in_24_hours")

                      return {
                        Header: key,
                        accessor: key,
                        Cell: ({value}) => (value==="Yes") ? <a>Yes</a> : <a>No</a>
                      }
                    if(key==="start_time")
                      return {
                        Header: key,
                        accessor: key,
                        Cell: ({value}) => <a>{value.slice(8, 10)} {months[parseInt(value.slice(5, 7)) - 1]},{value.slice(0,4)}<br/>
                        {value.slice(11,19)}(UTC)
                        </a>
                      }
                      if(key==="end_time")
                        return {
                          Header: key,
                          accessor: key,
                          Cell: ({value}) => <a>{value.slice(8, 10)} {months[parseInt(value.slice(5, 7)) - 1]},{value.slice(0,4)}<br/>
                          {value.slice(11,19)}(UTC)
                          </a>
                        }
                        if(key==="duration")
                        return {
                          Header: key,
                          accessor: key,
                          Cell: ({value}) => <a>{parseInt(value/3600)} Hrs {parseInt((value-((parseInt(value/3600)))*3600)/60)} Mins</a>
                        }
                        if(key==="site")
                        return {
                          Header: key,
                          accessor: key,
                          Cell: ({value}) =>  <a>{value}</a>
                        }
                      
                  return { Header: key, accessor: key };
                })
            : [],
        [contests]
    );
    
    const tableInstance = useTable(
        {
          columns: contestColumns,
          data: contestData,
        },
        useFilters,
        useGlobalFilter,
        useSortBy
    );
    
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
        preGlobalFilteredRows,
        setGlobalFilter,
        state,
    } = tableInstance;
    
    useEffect(() => {
        fetchContests();
    }, []);
    
    return (
        <>
            <GlobalFilter 
                preGlobalFilteredRows={preGlobalFilteredRows}
                setGlobalFilter={setGlobalFilter}
                globalFilter={state.globalFilter}
            />

        <Table {...getTableProps()}>
          <TableHead>
            {// Loop over the header rows
            headerGroups.map(headerGroup => (
              // Apply the header row props
              <TableRow {...headerGroup.getHeaderGroupProps()}>
                {// Loop over the headers in each row
                headerGroup.headers.map(column => (
                  // Apply the header cell props
                  <TableHeader {...column.getHeaderProps(column.getSortByToggleProps())}>
                    {// Render the header
                    column.render('Header')}
                    {column.isSorted ? (column.isSortedDesc ? " ▼" : " ▲") : ""}
                  </TableHeader>
                ))}
              </TableRow>
            ))}
          </TableHead>
          {/* Apply the table body props */}
          <TableBody {...getTableBodyProps()}>
            {// Loop over the table rows
            rows.map(row => {
              // Prepare the row for display
              prepareRow(row)
              return (
                // Apply the row props
                <TableRow {...row.getRowProps()}>
                  {// Loop over the rows cells
                  row.cells.map(cell => {
                    // Apply the cell props
                    return (
                      <TableData {...cell.getCellProps()}>
                        {// Render the cell contents
                        cell.render('Cell')}
                      </TableData>
                    )
                  })}
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
        </>
      );
     
};