export enum Code {
  JENKINS = `podTemplate(containers: [containerTemplate(name: 'maven', image: 'maven', command: 'sleep', args: 'infinity')]) {
    node(POD_LABEL) {
      checkout scm
      container('maven') {
        sh 'mvn -B -ntp -Dmaven.test.failure.ignore verify'
      }
      junit '**/target/surefire-reports/TEST-*.xml'
    }
  }
  `,
  POM = `<?xml version="1.0" encoding="UTF-8"?>
  <project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
      <modelVersion>4.0.0</modelVersion>
      <groupId>test</groupId>
      <artifactId>simple-maven-project-with-tests</artifactId>
      <version>1.0-SNAPSHOT</version>
      <packaging>jar</packaging>
      <licenses>
          <license>
              <name>MIT License</name>
              <url>http://opensource.org/licenses/MIT</url>
          </license>
      </licenses>
      <build>
          <plugins>
              <plugin>
                  <groupId>org.apache.maven.plugins</groupId>
                  <artifactId>maven-surefire-plugin</artifactId>
                  <version>2.18.1</version>
              </plugin>
          </plugins>
      </build>
      <dependencies>
          <dependency>
              <groupId>junit</groupId>
              <artifactId>junit</artifactId>
              <version>4.13.1</version>
              <scope>test</scope>
          </dependency>
      </dependencies>
      <properties>
          <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
          <maven.compiler.source>1.7</maven.compiler.source>
          <maven.compiler.target>1.7</maven.compiler.target>
      </properties>
  </project>
  `,
  Base = `package example;

  import static org.junit.Assert.*;
  import org.junit.internal.AssumptionViolatedException;
  
  class Base {
  
      protected void run() {
          double r = Math.random();
          if (r < 0.1) {
              fail("oops");
          } else if (r < 0.2) {
              throw new AssumptionViolatedException("skipping");
          }
      }
  }
  `,
  ImportMain = `
  /*
 * The MIT License
 *
 * Copyright 2016 CloudBees, Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
  package example;

  import org.junit.Test;
  import org.junit.Before;
  import static org.junit.Assert.*;`
}