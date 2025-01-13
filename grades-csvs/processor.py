import json
import csv

LETTER_GRADES = {"A": 4,"B": 3,"C": 2,"D": 1,"F": 0, "Other":-1}

# difficulty is defined as the % of the class that received an A. Higher % means the course is easier; lower means harder
# accumulated and averaged over semesters
def determine_course_difficulty(semesters: object) -> float:
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
    return round(difficultyPercent / semesterCount, 2) # return average difficulty % across all semesters

def determine_average_gpa(semesters: object) -> float:
    totalScoreCounts: int = 0 # total # of students taking the course that received a grade
    averageGPA: float = 0
    semesterCount = 0
    for semester, semesterData in semesters.items():
        totalScoreCounts = 0
        semesterCount += 1
        totalScoreCounts += semesterData["A"]
        totalScoreCounts += semesterData["B"]
        totalScoreCounts += semesterData["C"]
        totalScoreCounts += semesterData["D"]
        totalScoreCounts += semesterData["F"]
        averageGPA += ((semesterData["A"]*4) + (semesterData["B"]*3) + (semesterData["C"]*2) + (semesterData["D"]*1)) / totalScoreCounts

    return round(averageGPA / semesterCount, 2) # return average difficulty % across all semesters

def determine_course_size(semesters: object) -> int:
    studentCount: int = 0
    semesterCount: int = 0
    for semester, semesterData in semesters.items():
        semesterCount += 1
        studentCount += semesterData["A"]
        studentCount += semesterData["B"]
        studentCount += semesterData["C"]
        studentCount += semesterData["D"]
        studentCount += semesterData["F"]
        studentCount += semesterData["Other"]
    return round(studentCount / semesterCount, 2)

def main():

    with open('grade-results.json', 'r') as json_file:
        grade_data = json.load(json_file)
    # grade_data: object = {}

    with open('utaustingrades2021-2022.csv', encoding="utf-8") as csv_file:
        reader = csv.reader(csv_file)
        next(reader) #skip header row
        for row in reader:
            # print("row: ", row)
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
                grade_data[courseID]["overview"]["coursePrefix"] = coursePrefix
                grade_data[courseID]["overview"]["courseNum"] = courseNum
                grade_data[courseID]["overview"]["courseTitle"] = courseTitle
                # grade_data[courseID]["overview"]["courseName"] = courseName
                grade_data[courseID]["overview"]["difficulty"] = 0
                grade_data[courseID]["overview"]["avgGPA"] = 0
                grade_data[courseID]["overview"]["avgSize"] = 0
                grade_data[courseID]["sems"] = {}
            if semester not in grade_data[courseID]["sems"]:
                grade_data[courseID]["sems"][semester] = {}
                grade_data[courseID]["sems"][semester]["A"] = 0
                grade_data[courseID]["sems"][semester]["B"] = 0
                grade_data[courseID]["sems"][semester]["C"] = 0
                grade_data[courseID]["sems"][semester]["D"] = 0
                grade_data[courseID]["sems"][semester]["F"] = 0
                grade_data[courseID]["sems"][semester]["Other"] = 0
            
            # ensures grade counts get accumulated across sections
            if (courseLetterGrade in LETTER_GRADES and courseLetterGrade in grade_data[courseID]["sems"][semester]):
                grade_data[courseID]["sems"][semester][courseLetterGrade] += courseGradeAmount

        for courseID, semesters in grade_data.items():
            # difficulty is defined as the % of the class that received an A. Higher % means the course is easier; lower means harder
            semesters["overview"]["difficulty"] = determine_course_difficulty(semesters=semesters["sems"])
            semesters["overview"]["avgGPA"] = determine_average_gpa(semesters=semesters["sems"])
            semesters["overview"]["avgSize"] = determine_course_size(semesters=semesters["sems"])

        json_object = json.dumps(grade_data, indent=4)
 
        # Writing to sample.json
        with open("new-results.json", "w") as outfile:
            outfile.write(json_object)
        csv_file.close()

main()