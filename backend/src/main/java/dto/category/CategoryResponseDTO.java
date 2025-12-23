package dto.category;


import lombok.*;

@Getter @AllArgsConstructor
public class CategoryResponseDTO {

    private Long id;
    private String name;
    private String description;
}
