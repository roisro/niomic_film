import React, {Component} from 'react'
import { Carousel } from 'react-responsive-carousel';
import axios from 'axios'
import { connect } from 'react-redux';
import { Card, Icon, Image, Grid, Header } from 'semantic-ui-react'


class Home extends Component {
    constructor(){
        super();
        this.state = {
            dataCarausel:[],
            loading:true,
            dataSchedule:[]
        }
    }
//Ambil data top film untuk carausel
    getDataCarausel = async ()=>{
        try {
            await axios.get(`https://api.tvmaze.com/shows`, {crossDomain:true})
            .then( (res) => {
                let sorted = res.data.sort(function (a,b){
                    return a.rating.average < b.rating.average ? 1 :
                    b.rating.average < a.rating.average ?-1:0
                })


                let dataRes = sorted.slice(0,10)
                this.setState({
                    dataCarausel:dataRes,
                    loading:false
                })
            })
        }
        catch(error){
            alert(JSON.stringify(error.message))
        }
    }

    //Ambil data schedule
    getDataSchedule = async ()=>{
        try {
            await axios.get(`https://api.tvmaze.com/schedule`, {crossDomain:true})
            .then( (res) => {
                // console.log(res.data)
                let dataRes = res.data
                this.setState({
                    dataSchedule:dataRes,
                })
            })
        }
        catch(error){
            alert(JSON.stringify(error.message))
        }
    }

    //Component yang dijalankan sebelum render
    componentDidMount = async () => {
        await this.getDataCarausel()
        await this.getDataSchedule()
    }

    render(){
    return (
        <>
            {this.state.loading ? (<h1> Loading ........</h1>) :(
                <div>
                         <Header size='large'>Top Films</Header>
           <Carousel autoPlay centerMode centerSlidePercentage={40} showStatus="false">
                {/* Mapping data dari Axios */}
                {this.state.dataCarausel.map((data,key) =>{
                    return(
                        <div key={key}>

                            <img style={{height:"auto", width:"40%"}} alt={data.name} src={data.image.medium} />
                            <p className="legend">{data.name}</p>

                        </div>
                    )
                }
                )}
                
            </Carousel>

            <Header size='large'>Film Schedule</Header>

         <Grid columns={5} divided>
         {this.state.dataSchedule.map((data,key) =>{
             var gambar = {...data.show.image}
             var rating= {...data.show.rating}

             if (data.show.image === null){
                 gambar='https://cdn.pixabay.com/photo/2016/11/15/07/09/photo-manipulation-1825450__480.jpg'
             } else
             {
                 gambar = gambar.medium
             }
             if (rating.average === null){
                rating=0
            } else
            {
                rating = rating.average
            }
                    return(      
                    <Grid.Column key={key}>
                        <Card>
                            <Image src={gambar} wrapped ui={false} />
                            <Card.Content>
                            <Card.Header>{data.show.name} {data.name}</Card.Header>
                            <Card.Meta>
                                    Eps : {data.name}
                            </Card.Meta>
                            <Card.Meta>
                                    Eps : {data.show.status} <br/>
                            </Card.Meta>
                            <Card.Description>
                             AirTime {data.show.schedule.time}
                            </Card.Description>
                            </Card.Content>
                            <Card.Content extra>
                            <h2>
                                <Icon name='star' />
                                {rating}
                            </h2>
                            </Card.Content>
                        </Card>
                    </Grid.Column>
                )
            })}
            </Grid>


            </div>
        ) }
        </>
    )
}
}

const mapDispatchtoProps = dispatch => {
    return dispatch({
        type: "ACTIVE_ITEM",
        ActiveItem: "home"
    })
}


  export default connect(null,mapDispatchtoProps) (Home);