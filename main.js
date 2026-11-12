const formulario = document.getElementById("formPoke");
const msg = document.getElementById("msg");
const resultado = document.getElementById("resultado");

formulario.addEventListener("submit", async function(evento) {
    evento.preventDefault(); // evitar que a página recarregue

    const id = document.getElementById("idPoke").value;
    
    // Feedback visual de carregamento
    msg.textContent = "Buscando Pokémon...";
    msg.style.color = "#007bff";
    resultado.classList.add("hidden");

    try {
        const resposta = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        
        // Verifica se a resposta foi bem-sucedida (ex: ID inexistente retorna 404)
        if (!resposta.ok) {
            throw new Error("Pokémon não encontrado. Verifique o ID e tente novamente.");
        }

        const pokemon = await resposta.json();

        // Linhas solicitadas (mantidas exatamente como pedido)
        document.getElementById("nomePokemon").textContent = pokemon.name;
        document.getElementById("imgPoke").src = pokemon.sprites.front_default;
        document.getElementById("basePoke").textContent = pokemon.base_experience;

        // --- NOVOS ATRIBUTOS ADICIONADOS ---
        
        // 1. Tipos: A API retorna um array. Vamos mapear, capitalizar a primeira letra e juntar com " / "
        const tipos = pokemon.types
            .map(t => t.type.name.charAt(0).toUpperCase() + t.type.name.slice(1))
            .join(" / ");
        document.getElementById("tipoPoke").textContent = `Tipo: ${tipos}`;

        // 2. Peso: A API retorna o peso em hectogramas. Dividimos por 10 para obter Quilogramas (kg)
        const pesoEmKg = (pokemon.weight / 10).toFixed(1);
        document.getElementById("pesoPoke").textContent = `Peso: ${pesoEmKg} kg`;

        // Sucesso: limpa a mensagem e exibe o resultado
        msg.textContent = "";
        resultado.classList.remove("hidden");

    } catch (erro) {
        // Tratamento de erro
        msg.textContent = erro.message;
        msg.style.color = "#dc3545";
        resultado.classList.add("hidden");
    }
});