import React, {Component} from 'react'
import { Grid, Image, Header, Card, Icon, Input } from 'semantic-ui-react'
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';
import axios from 'axios'

export class Film extends Component {
    constructor(){
        super();
        this.state = {
            dataFilm:[],
            loading:true,
            dataSearch:[]
        }
    }

//get data film
getDataFilm = async ()=>{
    try {
        await axios.get(`https://api.tvmaze.com/search/shows?q=marvel`, {crossDomain:true})
        .then( (res) => {
            console.log(res.data)
            let dataRes = res.data
            this.setState({
                dataFilm:dataRes,
                loading:false
            })
        })
    }
    catch(error){
        alert(JSON.stringify(error.message))
    }
}
// Function Search
getDataSearch = async (e)=>{
    if (e.target.value ===""){
        this.getDataFilm()
    }  
    else {

    
    try {
        await axios.get(`https://api.tvmaze.com/search/shows?q=${e.target.value}`, {crossDomain:true})
        .then( (res) => {
            console.log(res.data)
            let dataRes = res.data
            this.setState({
            dataFilm:dataRes
            })
        })
    }
    catch(error){
        alert(JSON.stringify(error.message))
    }
}
}


  //Component yang dijalankan sebelum render
  //mengambil data film dari tv maze
  componentDidMount = async () => {
    await this.getDataFilm()
}



    render(){
    return (
        <>
        <div>
        <Header size='large'>Database Film</Header>
            <Grid celled='internally'>
                <Grid.Row>
                <Grid.Column width={2}>
                    <Image src='https://cdn.pixabay.com/photo/2013/07/12/14/53/loudspeaker-148969_960_720.png' />
                    <Image style={{marginTop:20}} src='https://cdn.pixabay.com/photo/2013/07/12/14/53/loudspeaker-148969_960_720.png' />
                    <Image style={{marginTop:20}} src='https://cdn.pixabay.com/photo/2013/07/12/14/53/loudspeaker-148969_960_720.png' />
                </Grid.Column>
                <Grid.Column width={10}>
                {/* Search Box */}
                <div style={{marginBottom: "20px"}}>
                    <Input icon='search' 
                    placeholder='Search Film...' 
                    // onChange={{e}=>{this.getDataSearch(e)}}
                    onChange={(e)=> {this.getDataSearch(e)} }
                    />
                </div>

                    {/*Card Data Film  */}
                    <Grid columns={3} divided>
                        {this.state.dataFilm.map((data,key) =>{
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
                                        <Link to={`/Detail/${data.show.id}`}>
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
                                            <Card.Meta>
                                                    Eps : {data.show.language} <br/>
                                            </Card.Meta>
                                            <Card.Description>
                                            Description : <div dangerouslySetInnerHTML={{__html:data.show.summary}}></div>
                                            </Card.Description>
                                            </Card.Content>
                                            <Card.Content extra>
                                            <h2>
                                                <Icon name='star' />
                                                {rating}
                                            </h2>
                                            </Card.Content>
                                        </Card>
                                        </Link>
                                    </Grid.Column>
                                )
                            })}
                    </Grid>





                    ---
                </Grid.Column>
                <Grid.Column width={3}>
                    <Image src='https://cdn.pixabay.com/photo/2013/07/12/14/53/loudspeaker-148969_960_720.png' />
                </Grid.Column>
                </Grid.Row>

            </Grid>
        </div>
        </>
    )
}
}

const mapDispatchtoProps = dispatch => {
    return dispatch({
        type: "ACTIVE_ITEM",
        ActiveItem: "film"
    })
}


  export default connect(null,mapDispatchtoProps) (Film);