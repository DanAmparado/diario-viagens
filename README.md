# Diário de Viagens

Aplicativo mobile desenvolvido em React Native com Expo para registrar lugares que você quer conhecer ou que já visitou. Cada lugar tem nome, descrição, endereço, status (Quero visitar ou Visitado) e foto. O app exibe os lugares em lista, mapa e gráficos.

Projeto desenvolvido individualmente para a disciplina de Programação para Dispositivos Móveis — FATEC Franca, 4º Semestre, 2º Bimestre de 2026.

## Aluno

- Daniel Lemos Amparado Junior

## Funcionalidades

- **Lista de Lugares**: exibe todos os lugares cadastrados com foto em miniatura, nome, cidade e status. Botão flutuante (`+`) para adicionar um novo lugar.
- **Cadastro de Lugar**: formulário com nome, descrição, rua, número, cidade, estado e status. Permite tirar foto pela câmera ou escolher da galeria. Ao salvar, o endereço é convertido em latitude e longitude via `Location.geocodeAsync`.
- **Detalhes do Lugar**: mostra todos os dados, a foto em tamanho maior e um mini mapa com o marcador do lugar. Permite editar, marcar como Visitado e remover.
- **Mapa**: exibe um marcador para cada lugar cadastrado e a localização atual do usuário (obtida pelo hook `useLocation`). Ao tocar no marcador, abre os Detalhes.
- **Estatísticas**: gráfico de pizza com a quantidade de lugares por status (Quero visitar e Visitado) e segundo gráfico de pizza com a quantidade de lugares por cidade. Ambos com legenda mostrando o valor de cada fatia e cores diferentes, refletindo os dados reais cadastrados.

## Tecnologias

- React Native 0.88 / Expo SDK 58
- React Navigation 7 (Bottom Tabs + Native Stack)
- Context API para estado global
- AsyncStorage para persistência local
- expo-location (geocodificação e localização atual)
- react-native-maps (mapas e marcadores)
- expo-image-picker, expo-camera, expo-media-library (foto e galeria)
- react-native-svg + react-native-svg-charts (gráficos)
- @expo/vector-icons (ícones das abas)

## Estrutura do projeto

```txt
diario-viagens/
├── src/
│   ├── components/
│   │   ├── LegendaGrafico.js
│   │   └── LugarItem.js
│   ├── context/
│   │   └── LugaresContext.js
│   ├── hooks/
│   │   └── useLocation.js
│   ├── navigation/
│   │   └── AppNavigator.js
│   └── screens/
│       ├── CadastroLugar.js
│       ├── DetalhesLugar.js
│       ├── Estatisticas.js
│       ├── ListaLugares.js
│       └── MapaLugares.js
├── App.js
├── app.json
├── package.json
└── README.md
```

## Instalação

Pré-requisitos:

- **Node.js** 20 ou superior
- **npm** 10 ou superior
- Aplicativo **Expo Go** instalado no celular (Android ou iOS), ou um emulador Android/iOS configurado
- Conta no Expo (opcional, mas recomendada)

Clone o repositório e instale as dependências:

```bash
git clone https://github.com/DanAmparado/diario-viagens.git
cd diario-viagens
npm install
```

> O projeto inclui um arquivo `.npmrc` com `legacy-peer-deps=true`, necessário porque o pacote `react-native-svg-charts@5.4.0` declara peer dependencies antigas (`react-native-svg@^6 || ^7`), enquanto o Expo SDK 58 instala a versão 15 do `react-native-svg`. O app funciona normalmente com essa combinação; a flag apenas faz o npm ignorar o conflito declarativo.

## Execução

Inicie o servidor do Expo:

```bash
npx expo start
```

Em seguida:

- **No celular**: abra o app **Expo Go** e escaneie o QR Code exibido no terminal.
- **No emulador Android**: pressione `a` no terminal.
- **No simulador iOS** (macOS): pressione `i` no terminal.

Se aparecerem erros de cache após mudanças no `app.json`, reinicie com:

```bash
npx expo start --clear
```

### Permissões solicitadas

O app solicita permissões de:

- **Localização** (para exibir sua posição no mapa e converter endereços em coordenadas).
- **Câmera** (para tirar a foto do lugar).
- **Galeria** (para escolher uma foto existente e salvar as fotos tiradas).

Se qualquer uma for negada, o app exibe uma mensagem de aviso explicando o impacto.

## Limitação conhecida no Expo Go (Android)

No **Android**, o app **Expo Go** não consegue mais conceder acesso total à galeria do dispositivo devido a mudanças nas regras de permissão do Android. Como consequência, a função de **salvar a foto automaticamente na galeria** (`MediaLibrary.saveToLibraryAsync`) é rejeitada nesse ambiente, e o terminal exibe o aviso:

```txt
Call to function 'ExpoMediaLibraryNext.requestPermissionsAsync' has been rejected.
→ Caused by: Due to changes in Android's permission requirements, Expo Go
  can no longer provide full access to the media library.
```

**O que ainda funciona no Expo Go (Android):**

- Tirar foto pela câmera e exibir no app.
- Escolher uma foto da galeria e exibir no app.
- Cadastro, lista, detalhes, mapa, gráficos e persistência.

**Como testar o salvamento na galeria por completo:**

É necessário gerar um **Development Build** do projeto, que compila um app nativo com as permissões declaradas no `app.json`. Para isso:

```bash
npx expo run:android
```

Esse comando requer o **Android Studio** instalado e configurado. No **iOS**, a limitação não existe e a função de salvar na galeria funciona normalmente no Expo Go.

## Observações sobre as fotos

- Fotos **escolhidas da galeria** têm o URI apontando para um arquivo permanente do dispositivo, então persistem entre reinícios do app.
- Fotos **tiradas pela câmera** são salvas no cache temporário do app pelo `expo-image-picker`. O sistema pode limpar esse cache após algum tempo. Quando o salvamento na galeria funciona (Development Build ou iOS), a foto também fica disponível na galeria do dispositivo, mesmo que o cache do app seja limpo.

## Testes recomendados

1. **Lista vazia**: ao abrir o app pela primeira vez, deve aparecer a mensagem "Nenhum lugar cadastrado ainda" e o botão `+`.
2. **Cadastro válido**: usar um endereço real (ex: `Av. Paulista, 1000, São Paulo, SP`) e confirmar que o lugar aparece na lista com as coordenadas corretas.
3. **Endereço inválido**: usar um endereço inexistente (ex: `Rua Inexistente, 999, Cidade Nenhuma, XX`) e confirmar que o app avisa e **não** cadastra.
4. **Edição**: abrir um lugar, alterar dados e salvar. As coordenadas devem ser recalculadas.
5. **Marcar como Visitado**: alterar o status e conferir a atualização na lista, no mapa e nos gráficos.
6. **Remover**: excluir um lugar e conferir que ele desaparece de todas as telas.
7. **Persistência**: fechar o app completamente e reabrir. Os lugares devem continuar lá.
8. **Mapa**: confirmar que os marcadores aparecem com cores diferentes por status e que o marcador azul da localização atual é exibido quando a permissão é concedida.
9. **Gráficos**: cadastrar pelo menos 3 lugares com cidades e status diferentes e confirmar que os dois gráficos refletem os dados reais.