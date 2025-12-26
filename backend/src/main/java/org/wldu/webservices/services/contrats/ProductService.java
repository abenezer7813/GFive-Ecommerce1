package org.wldu.webservices.services.contrats;
import org.wldu.webservices.dto.product.ProductRequestDTO;
import org.wldu.webservices.enities.Product;

import java.util.List;

public interface ProductService {

    Product createProduct(ProductRequestDTO productRequest);

    List<Product> getAllProducts();

    Product getProduct(Long id);

    void buyProduct(Long productId);

    void deleteProduct(Long id);
}

