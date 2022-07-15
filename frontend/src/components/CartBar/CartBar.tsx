import React, {useEffect} from 'react';
import {Bar} from 'react-chartjs-2';
import {CategoryScale} from 'chart.js';
import Chart from 'chart.js/auto';
import {useAppDispatch, useAppSelector} from "../../hooks";
import {getAll} from "../../store/slice/locality.slice";

Chart.register(CategoryScale);


const CartBar = () => {
    const {locality} = useAppSelector(state => state.localityReducer);
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(getAll())
    }, [])

    const localityDishId = []
    const localityName = []

    for (const iLocality of locality) {
        localityDishId.push(iLocality.dish.length)
        localityName.push(iLocality.name)
    }


    return (
        <div style={{height: 200, width: 700}}>
            <Bar
                data={{
                    labels: localityName,
                    datasets: [{
                        label: '# of votes',
                        data: localityDishId,
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(255, 206, 86, 0.2)',
                            'rgba(75, 192, 192, 0.2)',
                            'rgba(153, 102, 255, 0.2)',
                            'rgba(255, 159, 64, 0.2)'
                        ],
                        borderColor: [
                            'rgba(255, 99, 132, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(75, 192, 192, 1)',
                            'rgba(153, 102, 255, 1)',
                            'rgba(255, 159, 64, 1)'
                        ],
                        borderWidth: 1
                    }]
                }}
                height={400}
                width={700}


            />
        </div>
    );
};

export default CartBar;
