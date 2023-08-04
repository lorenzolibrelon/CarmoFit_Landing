// Variável para armazenar a data selecionada
let dataSelecionada = null;

// Função para marcar a data selecionada
function selecionarData(dia) {
  dataSelecionada = dia;
  const elementosDias = document.querySelectorAll('.calendario-dia');
  elementosDias.forEach((elemento) => {
    elemento.classList.remove('selecionado');
  });
  document.querySelector(`[data-dia="${dia}"]`).classList.add('selecionado');
}

// Função para gerar o calendário
function gerarCalendario() {
  const calendario = document.getElementById('calendario');

  // Obter a data atual
  const dataAtual = new Date();

  // Obter o número de dias no mês atual
  const numeroDiasNoMes = new Date(dataAtual.getFullYear(), dataAtual.getMonth() + 1, 0).getDate();

  // Obter o primeiro dia da semana do mês atual
  const primeiroDiaSemana = new Date(dataAtual.getFullYear(), dataAtual.getMonth(), 1).getDay();

  // Array com os nomes dos dias da semana e dos meses
  const nomesDiasSemana = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
  const nomesMeses = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];

  let html = '<div class="calendario-semana">';
  for (let i = 0; i < 7; i++) {
    html += `<div class="calendario-dia">${nomesDiasSemana[i]}</div>`;
  }
  html += '</div>';

  let diaSemana = 0;
  html += '<div class="calendario-semana">';
  for (let dia = 1; dia <= numeroDiasNoMes; dia++) {
    const dataDia = new Date(dataAtual.getFullYear(), dataAtual.getMonth(), dia).toISOString().split('T')[0];

    if (dia === 1) {
      diaSemana = primeiroDiaSemana;
      for (let j = 0; j < diaSemana; j++) {
        html += '<div class="calendario-dia"></div>';
      }
    }

    html += `<div class="calendario-dia" data-dia="${dataDia}" onclick="selecionarData('${dataDia}')">${dia}</div>`;

    if (diaSemana === 6) {
      html += '</div><div class="calendario-semana">';
    }

    diaSemana = (diaSemana + 1) % 7;
  }
  html += '</div>';

  calendario.innerHTML = html;
}

// Adicionar um evento para salvar a data selecionada quando o formulário for enviado
document.querySelector('form').addEventListener('submit', function (event) {
  event.preventDefault();
  const dataConsultaInput = document.getElementById('data_consulta');
  dataConsultaInput.value = dataSelecionada;
});
