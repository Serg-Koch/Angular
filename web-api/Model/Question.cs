using System.Runtime.CompilerServices;

namespace web_api;

public class Question
{
    public int Id {get; set;}
    public string Type {get; set;}
    public string QuestionText {get; set;}
    public List<Answer> Answers {get;set;}
    public string Hint {get;set;}
}
