import RepositoriesSummary from "./RepositoriesSummary";
import { screen, render } from "@testing-library/react";

test('displayed the primary language',()=>{
    const repository = {
        language: 'Javascript',
        stargazers_count: 5,
        forks: 30,
        open_issues: 1
    }
    render(<RepositoriesSummary repository={repository}/>)

    const language = screen.getByText("Javascript")
    expect(language).toBeInTheDocument();
})

test('displays information about the repository',()=>{
    const repository = {
        language: 'Javascript',
        stargazers_count: 5,
        forks: 30,
        open_issues: 1
    }
    render(<RepositoriesSummary repository={repository}/>)
    for(let key in repository){
        const value = repository[key];
        const ele = screen.getByText(new RegExp(value))

        expect(ele).toBeInTheDocument()
    }
})