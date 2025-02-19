package desafio.controller;

import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import desafio.exception.ErrorResponse;
import desafio.model.Veiculo;
import desafio.services.VeiculoService;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.NoSuchElementException;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;

@RestController
@RequestMapping("/veiculos")
public class VeiculoController {
    private final VeiculoService veiculoService;

    // Injeção de dependência
    public VeiculoController(VeiculoService veiculoService) {
        this.veiculoService = veiculoService;
    }

    // Cadastrar Veículo
    @PostMapping
    public ResponseEntity<Object> create(@RequestBody Map<String, Object> veiculo) {
        try {
            // System.out.println(veiculo);
            Veiculo veiculoSalvo = veiculoService.create(veiculo); // Chama o serviço para criar o veículo

            Map<String, Object> response = new HashMap<>();
            response.put("message", "Veículo criado com sucesso!");
            response.put("veiculo", veiculoSalvo); // Inclui o veículo salvo no JSON

            // Retorna o veículo criado com status 201 Created
            return ResponseEntity.status(HttpStatus.CREATED).body(response);
        } catch (IllegalArgumentException e) {
            ErrorResponse error = new ErrorResponse(e.getMessage(), HttpStatus.BAD_REQUEST.value());
            return new ResponseEntity<>(error, HttpStatus.BAD_REQUEST);
        } catch (Exception e) {
            ErrorResponse error = new ErrorResponse("Erro interno: " + e.getMessage(),
                    HttpStatus.INTERNAL_SERVER_ERROR.value());
            return new ResponseEntity<>(error, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // Buscar veículo por ID
    @GetMapping("/{id}")
    public ResponseEntity<Object> findById(@PathVariable("id") String id) {
        try {
            Veiculo veiculo = veiculoService.findById(id);

            return ResponseEntity.ok(veiculo);
        } catch (NoSuchElementException e) {
            ErrorResponse error = new ErrorResponse(e.getMessage(), HttpStatus.NOT_FOUND.value());
            return new ResponseEntity<>(error, HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            ErrorResponse error = new ErrorResponse("Erro interno: " + e.getMessage(),
                    HttpStatus.INTERNAL_SERVER_ERROR.value());
            return new ResponseEntity<>(error, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // Atualizar
    @PatchMapping("/{id}")
    public ResponseEntity<Object> update(@PathVariable("id") String id, @RequestBody Veiculo veiculo) {
        try {
            Veiculo veiculoAtualizado = veiculoService.updatePartial(id, veiculo);

            Map<String, Object> response = new HashMap<>();
            response.put("message", "Veículo atualizado com sucesso!");
            response.put("veiculoAtualizado", veiculoAtualizado); // Inclui o veículo salvo no JSON

            return ResponseEntity.status(HttpStatus.OK).body(response);
        } catch (NoSuchElementException e) {
            // Retorna erro padronizado com status 404 (Not Found)
            ErrorResponse error = new ErrorResponse(e.getMessage(), HttpStatus.NOT_FOUND.value());
            return new ResponseEntity<>(error, HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            // Trata erros inesperados com status 500 (Internal Server Error)
            ErrorResponse error = new ErrorResponse("Erro interno: " + e.getMessage(),
                    HttpStatus.INTERNAL_SERVER_ERROR.value());
            return new ResponseEntity<>(error, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // Apagar
    @DeleteMapping("/{id}")
    public ResponseEntity<Object> delete(@PathVariable("id") String id) {
        try {
            veiculoService.delete(id); // Chama o Método que vai validar UUID e existência
            return ResponseEntity.status(HttpStatus.OK)
                    .body(new ErrorResponse("Removido com sucesso!", HttpStatus.OK.value()));
        } catch (NoSuchElementException e) {
            ErrorResponse error = new ErrorResponse(e.getMessage(), HttpStatus.NOT_FOUND.value());
            return new ResponseEntity<>(error, HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            ErrorResponse error = new ErrorResponse("Erro interno: " + e.getMessage(),
                    HttpStatus.INTERNAL_SERVER_ERROR.value());
            return new ResponseEntity<>(error, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // Listar todos
    @GetMapping
    public List<Veiculo> findAll() {
        return veiculoService.findAll();
    }
}
