package org.wldu.webservices.services.imp;


import org.springframework.stereotype.Service;

import org.wldu.webservices.repositories.ProductRepository;

@Service
public class DashboardService {

    private final ProductRepository productRepository;

    public DashboardService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    public Long getTotalStockQuantity() {
        return productRepository.getTotalStockQuantity();
    }
}
