const empleados = [
  { nombre: "María",    puesto: "Soporte Nivel 1",   telefono: "55-1234-5678", inicio: "08:00", fin: "16:00" },
  { nombre: "Carlos",   puesto: "Administrador TI",   telefono: "55-8765-4321", inicio: "09:00", fin: "17:00" },
  { nombre: "Joserra",  puesto: "Líder de Soporte",   telefono: "55-1122-3344", inicio: "10:00", fin: "18:00" },
  { nombre: "Luisa",    puesto: "Desarrolladora Web", telefono: "55-4433-2211", inicio: "11:00", fin: "19:00" },
  { nombre: "Turno Noche", puesto: "Guardia Nocturna", telefono: "55-9988-7766", inicio: "18:00", fin: "06:00" },
];

function mostrarHora() {
  const ahora = new Date();
  const opciones = { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false };
  document.getElementById("clock").textContent = ahora.toLocaleTimeString('es-ES', opciones);
}

function actualizarTabla() {
  const ahora = new Date();
  const actualMinutos = ahora.getHours() * 60 + ahora.getMinutes();
  const cuerpo = document.getElementById("tabla-turnos");
  cuerpo.innerHTML = "";

  empleados.forEach(emp => {
    const [hInicio, mInicio] = emp.inicio.split(":").map(Number);
    const [hFin,    mFin]    = emp.fin.split(":").map(Number);
    const inicioMinutos = hInicio * 60 + mInicio;
    const finMinutos    = hFin   * 60 + mFin;

    let enTurno = false;
    if (inicioMinutos <= finMinutos) {
      enTurno = actualMinutos >= inicioMinutos && actualMinutos <= finMinutos;
    } else {
      enTurno = actualMinutos >= inicioMinutos || actualMinutos <= finMinutos;
    }

    let estado = "", clase = "";
    if (enTurno) {
      estado = "🟢 En turno"; clase = "en-turno";
    } else if (
      (inicioMinutos <= finMinutos && actualMinutos < inicioMinutos) ||
      (inicioMinutos > finMinutos && actualMinutos < inicioMinutos && actualMinutos > finMinutos)
    ) {
      estado = "🕒 Por entrar"; clase = "por-entrar";
    } else {
      estado = "🔴 Fuera de turno"; clase = "fuera-turno";
    }

    cuerpo.innerHTML += `
      <tr>
        <td>${emp.nombre}</td>
        <td>${emp.puesto}</td>
        <td>${emp.telefono}</td>
        <td>${emp.inicio} - ${emp.fin}</td>
        <td class="estado ${clase}">${estado}</td>
      </tr>`;
  });
}

setInterval(() => {
  mostrarHora();
  actualizarTabla();
}, 1000);

// Primera ejecución
mostrarHora();
actualizarTabla();