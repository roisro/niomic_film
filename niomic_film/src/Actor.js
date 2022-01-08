import React, {Component} from 'react'
import { connect } from 'react-redux'
import { Carousel } from 'react-responsive-carousel';
import axios from 'axios'
import {Grid, Card, Image, Input } from 'semantic-ui-react'

class Actor extends Component {
    constructor(){
        super();
        this.state = {
            dataActor : [],
            loading : true
        }
    }

    getDataActor = async () => {
        try{
        await axios.get(`http://api.tvmaze.com/search/people?q=b`)
        .then((res) => {
            this.setState({
                dataActor: res.data,
                loading: false
            })
        })
        }
        catch(error){
            alert(JSON.stringify(error.message))
        }
    }

    getDataSearch = async (e)=>{
        if (e.target.value ===""){
            this.getDataActor()
        }  
        else {
    
        
        try {
            await axios.get(`http://api.tvmaze.com/search/people?q=${e.target.value}`, {crossDomain:true})
            .then( (res) => {
                console.log(res.data)
                this.setState({
                dataActor: res.data,
                loading: false
                })
            })
        }
        catch(error){
            alert(JSON.stringify(error.message))
        }
    }
    }


    componentDidMount = () => {
        this.getDataActor()
    }


    render(){
        console.log(this.state.dataActor)
    return (
        <>
        {this.state.loading ? <h2>Loading</h2> :(
        <div>
        
           <div>
               <Carousel  autoPlay centerMode centerSlidePercentage={40} showStatus={false}>
                   {this.state.dataActor.map((data,key)=>{

                            var gambar = {...data.person.image}
                        if (data.person.image === null){
                            gambar='https://cdn.pixabay.com/photo/2016/11/15/07/09/photo-manipulation-1825450__480.jpg'
                        } else
                        {
                            gambar = gambar.original 
                        }

                    return(
                        <div>
                            <img style={{height:"auto",width:"40%" }} src={gambar} alt={data.person.name} />
                            <p className="legend">{data.person.name}</p>
                        </div>
                        
                    )
                   })}
               

               
               
               </Carousel></div>
               

          <Grid style ={{MarginTop: "20px"}} celled>
            <Grid.Column width={4}>
                <Image src='https://cdn.pixabay.com/photo/2013/07/12/14/53/loudspeaker-148969_960_720.png' />
            </Grid.Column>
            <Grid.Column width={12}>
            <Input 
                size="big" 
                style={{marginBottom:"20px"}} 
                icon='users' iconPosition='left' 
                placeholder='Search Actor...'
                onChange={(e) => {this.getDataSearch(e)}} 
            />

            <Card.Group>
                
                {this.state.dataActor.map((data,key)=>{

                var gambar = {...data.person.image}
                var country = {...data.person.country}
                
                return(
                    <Card>
                    <Card.Content>
                        <Image
                            floated='left'
                            size='mini'
                            src={gambar.medium ? gambar.medium : "https://cdn.pixabay.com/photo/2016/11/15/07/09/photo-manipulation-1825450__480.jpg"}
                        />
                        <Card.Header>{data.person.name}</Card.Header>
                        <Card.Meta>Gender : {data.person.gender ? data.person.gender : "No Data"}</Card.Meta>
                        <Card.Meta>Country : {country.name ? country.name : "No Data"}</Card.Meta>
                        <Card.Description>
                            <a href={data.person.url}>Link Bio :</a>
                        </Card.Description>
                    </Card.Content>
                    </Card>
                 )
                })}                

                </Card.Group>
                </Grid.Column>

          </Grid>

        </div>
        )}
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


export default connect(null,mapDispatchtoProps) (Actor);