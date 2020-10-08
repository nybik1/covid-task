import React from 'react';
import s from './style.module.scss';
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import moment from 'moment';
import TotalStat from './TotalStat';


function CovidInfo() {

    const [covidInfo, setCovidInfo] = React.useState([])
    const [dateFrom, setDateFrom] = React.useState('2020-03-17T00:00:00Z')
    const [dateTo, setDateTo] = React.useState('2020-10-07T00:00:00Z')

    React.useEffect(() => {


        fetch(`https://api.covid19api.com/country/ukraine?from=${dateFrom}&to=${dateTo}`)
            .then((res) => res.json())
            .then((data) =>
                setCovidInfo(data))
    }, [dateFrom, dateTo])

    const handleDateFrom = (e) => {
        setDateFrom(moment(e.target.value).toISOString())
        localStorage.setItem('DateFrom', e.target.value)
    }

    const handleDateTo = (e) => {
        setDateTo(moment(e.target.value).toISOString())
        localStorage.setItem('DateTo', e.target.value)
    }

    const formatXAxis = (tickItem) => {
        return moment(tickItem).format('D MMM');
    }


    return (
        <>
            <h1>Covid Statistic</h1>
            <div className={s.contentWrapper}>
                <div className={s.dateFilterWrapper}>
                    <label htmlFor='DateFrom'>Choose Date from: </label>
                    <select className={s.datePicker} name='DateFrom' onChange={handleDateFrom}>
                        {covidInfo.map((item) => <option key={item.Date}>{moment(item.Date).format('llll')}</option>)}
                    </select>
                    <label htmlFor='DateFrom'>Choose Date To: </label>
                    <select className={s.datePicker} name='DateTo' onChange={handleDateTo}>
                        {covidInfo.map((item) => <option key={item.Date}>{moment(item.Date).format('llll')}</option>)}
                    </select>
                </div>
                <TotalStat />
            </div>
            <ResponsiveContainer width='95%' height={600}>
                <LineChart data={covidInfo}>
                    <Line type="monotone" dataKey="Confirmed" stroke="#8884d8" />
                    <Line type="monotone" dataKey="Deaths" stroke="black" />
                    <Line type="monotone" dataKey="Active" stroke="red" />
                    <XAxis dataKey="Date" domain={['dataMin', 'dataMax']} textAnchor='end' tickFormatter={formatXAxis} tick={{ fill: '#ffff' }} />
                    <YAxis tick={{ fill: '#ffff' }} />
                    <Tooltip />
                    <Legend />
                </LineChart>
            </ResponsiveContainer>
        </>
    );
}

export default CovidInfo;