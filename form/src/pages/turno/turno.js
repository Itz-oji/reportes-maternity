import { loadHtml } from "../../utils/loadHtml.js";
import { getField, updateField } from "../../store.js";
import { profesionales } from "../../utils/profesionales.js";
import flatpickr from "https://esm.sh/flatpickr@4.6.13";
import { Spanish } from "https://esm.sh/flatpickr@4.6.13/dist/l10n/es.js";

export const turno = {
  id: "turno",

  async render(container) {
    container.innerHTML = await loadHtml("./src/pages/turno/turno.html");

    const beneficiarioInput = container.querySelector("#beneficiario");
    const profesionalSelect = container.querySelector("#profesional");
    const fechaTurnoInput = container.querySelector("#fechaTurno");
    const horaInicioInput = container.querySelector(".js-inicio");
    const horaTerminoInput = container.querySelector(".js-termino");

    this.cargarProfesionales(profesionalSelect);

    if (beneficiarioInput) beneficiarioInput.value = getField("beneficiario") || "";
    if (profesionalSelect) profesionalSelect.value = getField("profesional") || "";
    if (horaInicioInput) horaInicioInput.value = getField("horaInicio") || "";
    if (horaTerminoInput) horaTerminoInput.value = getField("horaTermino") || "";

    if (beneficiarioInput) {
      beneficiarioInput.addEventListener("input", (e) => {
        updateField("beneficiario", e.target.value);
      });
    }

    if (profesionalSelect) {
      profesionalSelect.addEventListener("change", (e) => {
        updateField("profesional", e.target.value);
      });
    }

    if (horaInicioInput) {
      horaInicioInput.addEventListener("change", (e) => {
        updateField("horaInicio", e.target.value);
      });
    }

    if (horaTerminoInput) {
      horaTerminoInput.addEventListener("change", (e) => {
        updateField("horaTermino", e.target.value);
      });
    }

    if (fechaTurnoInput) {
      flatpickr(fechaTurnoInput, {
        locale: Spanish,
        dateFormat: "Y-m-d",
        altInput: true,
        altFormat: "d/m/Y",
        defaultDate: getField("fechaTurno") || null,
        allowInput: false,
        disableMobile: true,
        onChange: function(selectedDates, dateStr) {
          updateField("fechaTurno", dateStr);
        }
      });
    }
  },

  cargarProfesionales(select) {
    if (!select) return;

    profesionales.forEach((nombre) => {
      const option = document.createElement("option");
      option.value = nombre;
      option.textContent = nombre;
      select.appendChild(option);
    });
  }
};
