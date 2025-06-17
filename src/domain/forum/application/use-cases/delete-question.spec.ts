import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { makeQuestion } from "test/factories/make-question";
import { InMemoryQuestionsRepository } from "test/repositories/in-memory-questions-repository";
import { Slug } from "../../enterprise/entities/value-objects/slug";
import { DeleteQuestionUseCase } from "./delete-question";

let inMemoryQuestionsRepository: InMemoryQuestionsRepository;
let sut: DeleteQuestionUseCase;

describe("Delete Question", () => {
	beforeEach(() => {
		inMemoryQuestionsRepository = new InMemoryQuestionsRepository();
		sut = new DeleteQuestionUseCase(inMemoryQuestionsRepository);
	});

	it("should be able to delete a question", async () => {
		const newQuestion = makeQuestion(
			{
				authorId: new UniqueEntityId("author-1"),
				slug: Slug.create("example-question"),
			},
			new UniqueEntityId("question-1"),
		);

		await inMemoryQuestionsRepository.create(newQuestion);

		await sut.execute({
			authorId: "author-1",
			questionId: "question-1",
		});

		expect(inMemoryQuestionsRepository.items).toHaveLength(0);
	});

	it("should not be able to delete a question from another user", async () => {
		const newQuestion = makeQuestion(
			{
				authorId: new UniqueEntityId("author-1"),
			},
			new UniqueEntityId("question-1"),
		);

		await inMemoryQuestionsRepository.create(newQuestion);

		await expect(
			sut.execute({
				authorId: "author-2",
				questionId: "question-1",
			}),
		).rejects.toBeInstanceOf(Error);
	});
});
