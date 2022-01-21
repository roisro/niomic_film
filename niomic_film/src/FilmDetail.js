import React, {Component} from 'react'
import axios from 'axios'
import { Grid, Image, Header, Icon, Card } from 'semantic-ui-react'


class FilmDetail extends Component {
    constructor(){
        super();
        this.state = {
            dataDetail:[],
            loading:true,
            dataSearch:[]
        }
    }

//get data detail film 
getDataDetail = async ()=> {
    try {
        let id= this.props.location.pathname.split('/')[2]
        console.log(id)
        await axios.get(`http://api.tvmaze.com/shows/${id}?embed=cast`, {crossDomain:true})
        .then( (res) => {
            console.log(res.data)
            this.setState({
                dataDetail: res.data,
                loading:false
            })
        })
    }
    catch(error){
        alert(JSON.stringify(error.message))
    }
}
// Function Search


  //Component yang dijalankan sebelum render
  //mengambil data film dari tv maze
  componentDidMount = async () => {
    await this.getDataDetail()
}



    render(){
        console.log(this.state.dataDetail)
    return (
        <>
            {this.state.loading ? ( <h1> Loading....... </h1>) : (

                <div style={{padiing:"20px"}}>
                    <Header size='large'>{this.state.dataDetail.name}</Header>
                    <Grid>
                    <Grid.Row>
                        <Grid.Column width={4}>
                        <Image src= {this.state.dataDetail.image?
                            this.state.dataDetail.image.original : 
                            'https://cdn.pixabay.com/photo/2016/11/15/07/09/photo-manipulation-1825450__480.jpg' }  
                            alt={this.state.dataDetail.name}
                        />
                        </Grid.Column>
                        <Grid.Column width={9}>
                        <Header size='medium'>Description</Header>
                        <div dangerouslySetInnerHTML={{__html:this.state.dataDetail.summary  }}></div>
                        </Grid.Column>
                        <Grid.Column width={3}>
                        <Header size='small'>Rating</Header>
                        <div><Icon name='star' size='large' /> 
                            {this.state.dataDetail.rating.average ? this.state.dataDetail.rating.average : "0" }
                        </div>
                        <Header size='small'>Genres</Header>
                        <div> {this.state.dataDetail.genres.map((genre,id)=>{
                            return (
                                <span key={id}> {genre}, </span>
                            )
                        })}
                           
                        </div>
                        <Header size='small'>Langage</Header>
                        <div>{this.state.dataDetail.language ? this.state.dataDetail.language : "No Data"}</div>
                        <Header size='small'>Status</Header>
                        <div>{this.state.dataDetail.status ? this.state.dataDetail.status : "No Data" }</div>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row columns={5}>
                        
                             {this.state.dataDetail._embedded.cast.map((actor,id)=>{
                                 return (
                                    <Grid.Column>
                                    <Card key={id} style={{padding:"15px"}}>
                                    <Image src={actor.person.image.medium} />
                                    <Card.Content>
                                    <Card.Header>{actor.person.name}</Card.Header>
                                    </Card.Content>    
                                    </Card>
                                    </Grid.Column>
                                 )
                             })}

                        
                        

                    </Grid.Row>
                    </Grid>

                </div>
            ) }
        </>
    )
}
}


  export default FilmDetail;