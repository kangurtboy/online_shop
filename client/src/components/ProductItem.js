import { Card, Col } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

const ProductItem = ({data}) => {
    const navigate = useNavigate()
    return (
        <Col xl={3} lg={4} sm={3} style={{marginBottom: 10}} onClick={() => navigate(`/product/${data.id}`)}>
            <Card style={{width: 226, height: 460, objectFit: 'contain', cursor: 'pointer'}}>
                {data.image ? (
                    <Card.Img className='mt-1' style={{width: 220, height: 360, marginLeft: 3, objectFit: 'contain'}} variant="top" src={process.env.REACT_APP_IMG_URL + data.image + '.webp'} />
                ) : (
                    <Card.Img variant="top" src="http://via.placeholder.com/200" />
                )}
                <Card.Body style={{height: 100, overflow: 'hidden', textAlign: 'center'}}>
                    <strong>{data.name}</strong>
                    <p>{data.price} тг.</p>
                </Card.Body>
            </Card>
        </Col>
    )
}

export default ProductItem