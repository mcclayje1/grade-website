import json
import csv

LETTER_GRADES = {"A": 4,"B": 3,"C": 2,"D": 1,"F": 0, "Other":-1}

# difficulty is defined as the % of the class that received an A. Higher % means the course is easier; lower means harder
# accumulated and averaged over semesters
def determine_course_difficulty(semesters: object) -> float:
    print("COURSE DATA: ", semesters)
    totalScoreCounts: int = 0 # total # of students taking the course that received a grade
    difficultyPercent: float = 0
    semesterCount = 0
    for semester, semesterData in semesters.items():
        totalScoreCounts = 0
        totalScoreCounts += semesterData["A"]
        totalScoreCounts += semesterData["B"]
        totalScoreCounts += semesterData["C"]
        totalScoreCounts += semesterData["D"]
        totalScoreCounts += semesterData["F"]
        if "A" in semesterData:
            semesterCount += 1
            difficultyPercent += (semesterData["A"] / totalScoreCounts) 


    return difficultyPercent / semesterCount # return average difficulty % across all semesters

def main():

    grade_data: object = {}

    with open('utaustingrades2023-2024.csv', encoding="utf-8") as csv_file:
        reader = csv.reader(csv_file)
        next(reader) #skip header row
        for row in reader:
            print("row: ", row)
            semester: str = row[0]
            sectionNum: str = row[1]
            department: str = row[2]
            coursePrefix: str = row[3]
            courseNum: str = row[4]
            courseID: str = coursePrefix + "-" + courseNum
            courseTitle: str = row[5]
            courseName: str = row[6]
            courseLetterGrade: str = row[7]
            courseGradeAmount: int = int(row[8].replace(",",""))
        
            if courseID not in grade_data:
                grade_data[courseID] = {}
                grade_data[courseID]["overview"] = {}
                grade_data[courseID]["overview"]["department"] = department
                grade_data[courseID]["overview"]["courseTitle"] = courseTitle
                grade_data[courseID]["overview"]["courseName"] = courseName
                grade_data[courseID]["overview"]["difficulty"] = 0
                grade_data[courseID]["semesters"] = {}

            if semester not in grade_data[courseID]["semesters"]:
                grade_data[courseID]["semesters"][semester] = {}
                grade_data[courseID]["semesters"][semester]["A"] = 0
                grade_data[courseID]["semesters"][semester]["B"] = 0
                grade_data[courseID]["semesters"][semester]["C"] = 0
                grade_data[courseID]["semesters"][semester]["D"] = 0
                grade_data[courseID]["semesters"][semester]["F"] = 0
                grade_data[courseID]["semesters"][semester]["Other"] = 0
            
            # ensures grade counts get accumulated across sections
            if (courseLetterGrade in LETTER_GRADES and courseLetterGrade in grade_data[courseID]["semesters"][semester]):
                grade_data[courseID]["semesters"][semester][courseLetterGrade] += courseGradeAmount

        for courseID, semesters in grade_data.items():
            semesters["overview"]["difficulty"] = determine_course_difficulty(semesters=semesters["semesters"])
            # difficulty is defined as the % of the class that received an A. Higher % means the course is easier; lower means harder
            # grade_data[courseID]["overview"]["difficulty"] = determine_course_difficulty(courseData=courseData)


        json_object = json.dumps(grade_data, indent=4)
 
        # Writing to sample.json
        with open("results.json", "w") as outfile:
            outfile.write(json_object)
        csv_file.close()

main()