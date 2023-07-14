import { screen, render } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import RepositoriesListItem from "./RepositoriesListItem";
import { async } from "validate.js";

// jest.mock('../tree/FileIcon', ()=>{
//     return()=>{
//         return 'File Icon Component'
//     }
// })

function renderComponent() {
    const repository = {
        full_name: 'Test Name',
        language: 'Javascript',
        description: 'This is a test description',
        owner: {
            login: 'user'
        },
        name: 'react',
        html_url: 'https://github.com/test'
    }
    render(
    <MemoryRouter>
        <RepositoriesListItem repository={repository}/>
    </MemoryRouter>
    )
    return repository
}

test('shows a link to the github homepage for the repository',async ()=>{
    const {html_url} = renderComponent()
    await screen.findByRole('img', {
        name: 'Javascript'
    })
    const link = screen.getByRole('link', {
        name: /github repository/
    });
    expect(link).toHaveAttribute('href', html_url)
})

test('shows the fileicon with appropriate icon', async ()=>{
    renderComponent();
    const icon = await screen.findByRole('img', {
        name: 'Javascript'
    })
    expect(icon).toHaveClass('js-icon')
})

test('shows a link to the code editor page', async()=>{
    const {owner, full_name} = renderComponent();
    await screen.findByRole('img', {
        name: 'Javascript'
    })
    const link = await screen.findByRole('link',{
        name: new RegExp(owner.login)
    })
    expect(link).toHaveAttribute('href',`/repositories/${full_name}`)
})