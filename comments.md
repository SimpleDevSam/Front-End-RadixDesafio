# Comentários
Esses comentários são só uma visão de melhoria da sua codificação não são eliminatórios

- Uso de um arquivo de constantes de texto e fixtures
- Excelente separação da camada de serviços, talvez não precise ser tão separada mas ideia muito boa
- Pages poderia ter uma pasta para separar Home, Task e News
- Componentes poderia ter uma pasta para separar Home, Task e News
- Usar o conceito do index.ts onde você pode exportar o conteúdo daquela pasta e não precisar usar a importação completa
   - Dentro de services/tasks, poderia criar um arquivo index.ts
     `
     export * from 'create';
     export * from 'deleteTask';
     etc
     `
   - Na importação  faria import { } from '../services/tasks' não precisaria ser '../services/tasks/create'
- Não fazer exportações de métodos, o legal é encapsular isso em uma classe.
