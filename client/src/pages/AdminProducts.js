import { useState, useEffect } from 'react'
import { fetchAllProducts, deleteProduct } from '../http/catalogAPI.js'
import { Button, Container, Spinner, Table, Pagination } from 'react-bootstrap'
import CreateProduct from '../components/CreateProduct.js'
import UpdateProduct from '../components/UpdateProduct.js'
import { Link } from 'react-router-dom'

const ADMIN_PER_PAGE = 16

const AdminProducts = () => {
    const [products, setProducts] = useState([])
    const [fetching, setFetching] = useState(true)
    const [createShow, setCreateShow] = useState(false)
    const [updateShow, setUpdateShow] = useState(false)
    const [change, setChange] = useState(false)
    const [product, setProduct] = useState(null)
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)

    const handlePageClick = (page) => {
        setCurrentPage(page)
        setFetching(true)
    }

    const pages = []
    for (let page = 1; page <= totalPages; page++) {
        pages.push(
            <Pagination.Item
                key={page}
                active={page === currentPage}
                activeLabel=""
                onClick={() => handlePageClick(page)}
            >
                {page}
            </Pagination.Item>
        )
    }

    const handleUpdateClick = (id) => {
        setProduct(id)
        setUpdateShow(true)
    }

    const handleDeleteClick = (id) => {
        deleteProduct(id)
            .then(
                data => {
                    if (totalPages > 1 && products.length === 1 && currentPage === totalPages) {
                        setCurrentPage(currentPage - 1)
                    } else {
                        setChange(!change)
                    }
                    alert(`Товар «${data.name}» удален`)
                }
            )
            .catch(
                error => alert(error.response.data.message)
            )
    }

    useEffect(() => {
        fetchAllProducts(null, null, currentPage, ADMIN_PER_PAGE)
            .then(
                data => {
                    setProducts(data.rows)
                    setTotalPages(Math.ceil(data.count / ADMIN_PER_PAGE))
                }
            )
            .finally(
                () => setFetching(false)
            )
    }, [change, currentPage])

    if (fetching) {
        return <Spinner animation="border" />
    }

    return (
        <Container>
            <h1>Товары</h1>
            <Button onClick={() => setCreateShow(true)}>Создать товар</Button>
            <CreateProduct show={createShow} setShow={setCreateShow} setChange={setChange} />
            <UpdateProduct id={product} show={updateShow} setShow={setUpdateShow} setChange={setChange} />
            {products.length > 0 ? (
                <>
                    <Table bordered hover size="sm" className="mt-3">
                    <thead>
                        <tr>
                            <th>Название</th>
                            <th>Фото</th>
                            <th>Категория</th>
                            <th>Бренд</th>
                            <th>Цена</th>
                            <th>Редактировать</th>
                            <th>Удалить</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map(item => 
                            <tr key={item.id}>
                                <td>{item.name}</td>
                                <td>
                                    {item.image &&
                                    <a href={process.env.REACT_APP_IMG_URL + item.image} target="_blank">фото</a>}
                                </td>
                                <td>{item.category?.name || 'NULL'}</td>
                                <td>{item.brand?.name || 'NULL'}</td>
                                <td>{item.price}</td>
                                <td>
                                    <Button variant="success" size="sm" onClick={() => handleUpdateClick(item.id)}>
                                        Редактировать
                                    </Button>
                                </td>
                                <td>
                                    <Button variant="danger" size="sm" onClick={() => handleDeleteClick(item.id)}>
                                        Удалить
                                    </Button>
                                </td>
                            </tr>
                        )}
                    </tbody>
                    </Table>
                    {totalPages > 1 && <Pagination>{pages}</Pagination>}
                </>
            ) : (
                <p>Список товаров пустой</p>
            )}
            <Button><Link style={{color: 'white', textDecoration: 'none'}} to="/admin">Назад</Link></Button>
        </Container>
    )
}

export default AdminProducts