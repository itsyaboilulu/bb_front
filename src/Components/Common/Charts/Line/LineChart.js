import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import Loading from 'Components/Common/Loading/Loading';
import _ from 'lodash'
import { setObjectWithNestedKey } from 'Helpers/GeneralHelper';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const initialState = () => ({
    dataSets: [],
    labels: [],
    options: {},
    reload: true,
})

class LineChart extends React.Component {
    constructor(props) {
        super(props);
        this.state = initialState()
    }

    componentDidMount = () => {
        this.setOptions();
        this.setData();      
    }

    componentDidUpdate = (prevProps) => {
        if (JSON.stringify(prevProps.data) !== JSON.stringify(this.props.data)){
            this.setData()
        }
        if (JSON.stringify(prevProps) !== JSON.stringify(this.props)){
            this.setOptions();
        }
    }

    setDataSet = (dataSets, name, value) => {
        return dataSets;
    }

    setData = () => {
        this.setState({reload: true}, () => {
            if ( this.props.data )  {
                let labels = _.keys(this.props.data);
                let dataSets = {};
                _.each(labels, async q => {
                    if (_.isObject(this.props.data[q])){
                        _.each(_.keys(this.props.data[q]), l => {
                            if (!dataSets[l]){
                                dataSets[l] = {
                                    label: l,
                                    data: [],
                                    borderColor: this.props.color && this.props.color[l],
                                    backgroundColor: this.props.color && this.props.color[l]
                                }
                            }
                            dataSets[l].data.push(this.props.data[q][l]);
                        })
                    } else {
                        if (!dataSets.Data){
                            dataSets['Data'] = {
                                label: 'Data',
                                data: [],
                                borderColor: this.props.color,
                                backgroundColor: this.props.color
                            }
                        }
                        dataSets['Data'].data.push(this.props.data[q]);
                    }
                });
                this.setState({
                    labels,
                    dataSets: _.values(dataSets),
                    reload: false
                })
            }
        })
    }

    setOptions = async () => {
        let options = {
            responsive: true,
            spanGaps: true,
            plugins: {},
            scales: {
                y: {
                    ticks: {
                        callback: (value, index) => {
                            return parseInt(value)/ 60
                        }
                    }
                }
            }
        }

        if (this.props.title) {
            options = await setObjectWithNestedKey(_.cloneDeep(options),'plugins.legend.position','top');
            options = await setObjectWithNestedKey(_.cloneDeep(options),'plugins.legend.display',true);
            options = await setObjectWithNestedKey(_.cloneDeep(options),'plugins.legend.text',this.props.title);
        }

        if ( this.props.hideLabel ) {
            options = await setObjectWithNestedKey(_.cloneDeep(options),'plugins.legend.display',false);
        }
        if ( this.props.yLabel ) {
            options = await setObjectWithNestedKey(_.cloneDeep(options),'scales.y.ticks.callback',this.props.yLabel);
        }
        if ( this.props.xLabel ) {
            options = await setObjectWithNestedKey(_.cloneDeep(options),'scales.x.ticks.callback',this.props.xLabel);
        }
        if ( this.props.zLabel ) {
            options = await setObjectWithNestedKey(_.cloneDeep(options),'plugins.tooltip.callbacks.label',this.props.zLabel);
        }
        if ( this.props.zHeading ) {
            options = await setObjectWithNestedKey(_.cloneDeep(options),'plugins.tooltip.callbacks.title',this.props.zHeading);
        }



        this.setState({ options })
    }

    render() {

        const { labels, dataSets, options, reload } = this.state;

        if (!options || !dataSets ){
            return (
                <Loading/>
            )
        }

        if (reload){
            return (<></>)
        }

        return (
            <Line
                key={JSON.stringify(dataSets)}
                options={options}
                data={{
                    labels: labels,
                    datasets: dataSets
                }}
            />
        )
    }

}

export default LineChart;