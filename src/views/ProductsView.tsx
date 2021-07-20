import React from 'react';

import Header from '../components/Header'
import Container from '../shared/Container'
import ProductsCRUD from '../components/Products/ProductsCRUD'

const HomeView = () => {
    return <>
        <Header title="Trisoft" />
        <Container>
            <ProductsCRUD />
        </Container>
    </>
}

export default HomeView