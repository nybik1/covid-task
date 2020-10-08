import React from 'react';
import axios from 'axios';
import s from './style.module.scss';

function TotalStat() {

    const [totalStat, setTotalStat] = React.useState([])


    React.useEffect(() => {

        axios(`https://api.covid19api.com/summary`)
            .then(({ data }) => setTotalStat(data.Countries.filter(country => country.Country === 'Ukraine')))
    }, [])
    return (
        <div className={s.totalInfoWrapper}>
            {totalStat && totalStat.map(country =>
                <>
                    <p><strong>Total confirmed: {country.TotalConfirmed}</strong></p>
                    <p><strong>Total deaths: {country.TotalDeaths}</strong></p>
                    <p><strong>Total recovered: {country.TotalRecovered}</strong></p>
                </>
            )}

        </div>
    );
}

export default TotalStat;