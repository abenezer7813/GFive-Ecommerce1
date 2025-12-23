package org.wldu.webservices.controllers;

import com.wldu.xsdgenerated.*;
import org.springframework.ws.server.endpoint.annotation.Endpoint;
import org.springframework.ws.server.endpoint.annotation.PayloadRoot;
import org.springframework.ws.server.endpoint.annotation.RequestPayload;
import org.springframework.ws.server.endpoint.annotation.ResponsePayload;
import xsdgenerated.*;
import xsdgenerated.AddRequest;
import xsdgenerated.AddResponse;
import xsdgenerated.DivideRequest;
import xsdgenerated.DivideResponse;
import xsdgenerated.MultiplyRequest;
import xsdgenerated.MultiplyResponse;
import xsdgenerated.SqrtRequest;
import xsdgenerated.SqrtResponse;
import xsdgenerated.SubtractRequest;
import xsdgenerated.SubtractResponse;

@Endpoint
public class CalculatorEndpoint {

    private static final String NAMESPACE_URI = "http://example.com/calculator";

    @PayloadRoot(namespace = NAMESPACE_URI, localPart = "AddRequest")
    @ResponsePayload
    public AddResponse add(@RequestPayload AddRequest request) {
        AddResponse response = new AddResponse();
        response.setResult(request.getA() + request.getB());
        return response;
    }

    @PayloadRoot(namespace = NAMESPACE_URI, localPart = "SubtractRequest")
    @ResponsePayload
    public SubtractResponse subtract(@RequestPayload SubtractRequest request) {
        SubtractResponse response = new SubtractResponse();
        response.setResult(request.getA() - request.getB());
        return response;
    }

    @PayloadRoot(namespace = NAMESPACE_URI, localPart = "MultiplyRequest")
    @ResponsePayload
    public MultiplyResponse multiply(@RequestPayload MultiplyRequest request) {
        MultiplyResponse response = new MultiplyResponse();
        response.setResult(request.getA() * request.getB());
        return response;
    }

    @PayloadRoot(namespace = NAMESPACE_URI, localPart = "DivideRequest")
    @ResponsePayload
    public DivideResponse divide(@RequestPayload DivideRequest request) {
        DivideResponse response = new DivideResponse();
        if (request.getB() != 0) {
            response.setResult(request.getA() / request.getB());
        } else {
            throw new IllegalArgumentException("Division by zero!");
        }
        return response;
    }

    @PayloadRoot(namespace = NAMESPACE_URI, localPart = "SqrtRequest")
    @ResponsePayload
    public SqrtResponse sqrt(@RequestPayload SqrtRequest request) {
        SqrtResponse response = new SqrtResponse();
        if (request.getA() >= 0) {
            response.setResult(Math.sqrt(request.getA()));
        } else {
            throw new IllegalArgumentException("Cannot take sqrt of negative number!");
        }
        return response;
    }

    // ===== NEW OPERATIONS =====

    @PayloadRoot(namespace = NAMESPACE_URI, localPart = "PowRequest")
    @ResponsePayload
    public PowResponse pow(@RequestPayload PowRequest request) {
        PowResponse response = new PowResponse();
        response.setResult(Math.pow(request.getA(), request.getB()));
        return response;
    }
   

    @PayloadRoot(namespace = NAMESPACE_URI, localPart = "CubeRequest")
    @ResponsePayload
    public CubeResponse cube(@RequestPayload CubeRequest request) {
        CubeResponse response = new CubeResponse();
        response.setResult(Math.pow(request.getA(), 3));
        return response;
    }

    @PayloadRoot(namespace = NAMESPACE_URI, localPart = "SquareRequest")
    @ResponsePayload
    public SquareResponse square(@RequestPayload SquareRequest request) {
        SquareResponse response = new SquareResponse();
        response.setResult(Math.pow(request.getA(), 2));
        return response;
    }

    @PayloadRoot(namespace = NAMESPACE_URI, localPart = "SinRequest")
    @ResponsePayload
    public SinResponse sin(@RequestPayload SinRequest request) {
        SinResponse response = new SinResponse();
        response.setResult(Math.sin(request.getA()));
        return response;
    }

    @PayloadRoot(namespace = NAMESPACE_URI, localPart = "CosRequest")
    @ResponsePayload
    public CosResponse cos(@RequestPayload CosRequest request) {
        CosResponse response = new CosResponse();
        response.setResult(Math.cos(request.getA()));
        return response;
    }

    @PayloadRoot(namespace = NAMESPACE_URI, localPart = "TanRequest")
    @ResponsePayload
    public TanResponse tan(@RequestPayload TanRequest request) {
        TanResponse response = new TanResponse();

        // Convert degrees to radians
        double radians = Math.toRadians(request.getA());

        // Calculate tangent
        response.setResult(Math.tan(radians));

        return response;
    }


    @PayloadRoot(namespace = NAMESPACE_URI, localPart = "LogRequest")
    @ResponsePayload
    public LogResponse getLog(@RequestPayload LogRequest request) {
        LogResponse response = new LogResponse();
        response.setResult(Math.log(request.getValue()));
        return response;
    }

}


