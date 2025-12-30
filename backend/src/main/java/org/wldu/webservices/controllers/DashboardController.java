package org.wldu.webservices.controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.wldu.webservices.services.imp.DashboardService;

import java.util.Map;

@RestController
@RequestMapping("/api/dashboard")
public class DashboardController {

    private final DashboardService dashboardService;

    public DashboardController(DashboardService dashboardService) {
        this.dashboardService = dashboardService;
    }

    @GetMapping("/total-stock")
    public Map<String, Long> getTotalStock() {
        return Map.of(
                "totalStockQuantity", dashboardService.getTotalStockQuantity()
        );
    }
}
