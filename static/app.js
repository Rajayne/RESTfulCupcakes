$(".delete-cupcake").click(deleteCupcake)

async function deleteCupcake() {
    const id = $(this).data("id");
    await axios.delete(`/api/cupcakes/${id}`);
    $(this).parent().remove()
    alert('Deleted!');
};

function generateCupcakeHTML(cupcake) {
    return `
        <li data-cupcake-id=${cupcake.id}>
            <img src=${cupcake.image} height="200" width="200">
            ${cupcake.flavor} / ${cupcake.size} / ${cupcake.rating}
            <button class="delete-cupcake" data-id="${cupcake.id}">X</button>
        </li>
    `
}

$('.add-cupcake-form').on("submit", async function (evt) {
    evt.preventDefault();

    let flavor = $("#form-flavor").val();
    let size = $("#form-size").val();
    let rating = $("#form-rating").val();
    let image = $("#form-image").val();

    const res = await axios.post(`/api/cupcakes`, {
        flavor,
        rating,
        size,
        image
    });

    let newCupcake = $(generateCupcakeHTML(res.data.cupcake));
    $(".cupcake-list").append(newCupcake);
    $(".add-cupcake-form").trigger("reset");
});